import { get, isEmpty } from 'lodash'
import store from 'store'
import Item from '../models/item'
import RestockReport from '../models/restock-report'
import { Credentials } from '../stores/authenticationStore'


function getCredentials() {
  const credentials = store.get('credentials')
  return credentials
}

const LocalStorage = {
  getToken: () => {
    const credentials = getCredentials()
    const token = get(credentials, 'token',)
    return token
  },

  getUser: () => {
    const credentials = getCredentials()
    const user = get(credentials, 'user',)
    return user
  },

  setCredentials: (credentials: Credentials) => {
    if (!isEmpty(credentials)) {
      store.set('credentials', credentials)
    }
  },

  getCredentials,
  clearCredentials: () => {
    store.remove('credentials')
  },

  getRestockReport: () => {
    const restockReport = store.get('restockReport')
    return restockReport
  },
  setRestockReport: (restockReport: RestockReport) => {
    if (!isEmpty(restockReport)) {
      store.set('restockReport', restockReport)
    }
  },

  getItem: () => {
    const item = store.get('item')
    return item
  },
  setItem: (item: Item) => {
    if (!isEmpty(item)) {
      store.set('item', item)
    }
  },

  getExpired: () => {
    const credentials = getCredentials()
    const expired = get(credentials, 'expired',)
    return expired
  },

}

export default LocalStorage

