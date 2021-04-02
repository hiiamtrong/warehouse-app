import { isEmpty } from 'lodash'
import store from 'store'
import Item from '../models/item'
import RestockReport from '../models/restock-report'
import User from '../models/user'
import { Credentials } from '../stores/authenticationStore'

const LocalStorage = {
  getToken: () => store.get('token'),
  setToken: (token: string) => {
    store.set('token', token)
  },
  getUser: () => {
    const user = store.get('user')
    return user
  },
  setUser: (user: User) => {
    if (!isEmpty(user)) {
      store.set('user', user)
    }
  },

  setCredentials: (credentials: Credentials) => {
    if (!isEmpty(credentials)) {
      store.set('credentials', credentials)
    }
  },

  getCredentials: () => {
    const credentials = store.get('credentials')
    return credentials
  },
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

  getExpired: () => store.get('expired'),
  setExpired: (expired: string) => {
    if (expired) {
      store.set('expired', expired)
    }
  },
}

export default LocalStorage
