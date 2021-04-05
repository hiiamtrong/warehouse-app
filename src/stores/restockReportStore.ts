import { action, makeObservable, observable } from 'mobx'
import RestockReportAPI from '../api/restockReportAPI'
import LocalStorage from '../libs/local-storages'
import RestockReport from '../models/restock-report'
import { RootStore } from '../store'

export class RestockReportStore {
  rootStore: RootStore
  restockReport: RestockReport | undefined
  waiting = false

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    const restockReport = LocalStorage.getRestockReport()
    if (restockReport) {
      this.setRestockReport(restockReport)
    }

    makeObservable(this, {
      restockReport: observable,
      waiting: observable,
      fetchById: action,
      countMobile: action,
      setWaiting: action,
      setRestockReport: action,
    })
  }

  setRestockReport = (restockReport: RestockReport) => {
    this.restockReport = restockReport
    LocalStorage.setRestockReport(restockReport)
  }

  fetchById = async (restockReportId: string) => {
    try {
      const response = await RestockReportAPI.fetchById(restockReportId)
      this.setRestockReport(response)
      return response
    } catch (error) {
      throw error
    }
  }

  countMobile = async ({ restockReportId, productId, quantity }: { restockReportId: string, productId: string, quantity: number }) => {
    try {
      const item = await RestockReportAPI.countMobile(restockReportId, productId, quantity)
      return item
    } catch (error) {
      throw error
    }

  }
  setWaiting = (status: boolean) => {
    this.waiting = status
  }
}

