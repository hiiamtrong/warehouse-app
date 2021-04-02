import Item from './item'

export interface RestockReport {
  _id: string
  name: string
  numRestockItems: number
  restockReportId: number
  outlet: { code: number }
  warehouseRestock: { code: number }
  items: Array<Item>
}

export default RestockReport
