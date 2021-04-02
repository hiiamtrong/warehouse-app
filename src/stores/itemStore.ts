import { action, makeObservable, observable } from 'mobx'
import LocalStorage from '../libs/local-storages'
import IItem from '../models/item'
import { RootStore } from '../store'

export class ItemStore {
  rootStore: RootStore
  item: IItem | null = null

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    const item = LocalStorage.getItem()
    if (item) {
      this.setItem(item)
    }

    makeObservable(this, {
      item: observable,
      setItem: action,
    })
  }

  setItem = (item: IItem) => {
    this.item = item
    LocalStorage.setItem(item)
  }
}
