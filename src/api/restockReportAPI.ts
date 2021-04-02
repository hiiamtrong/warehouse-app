import apiClient from '../libs/api-service'
const RestockReportAPI = {
  getAll: async () => {
    const restockReports = await apiClient
      .get('/api/restock-reports')
    return restockReports
  },
  fetchById: async (restockReportId: string) => {
    const restockReport = await apiClient
      .get('/api/restock-reports/' + restockReportId)
    return restockReport
  },
  countMobile: async (restockReportId: string, productId: string, quantity: number) => {
    const item = await apiClient
      .get(`/api/restock-reports/${restockReportId}/count-mobile/${productId}`, { params: { quantity } })
    return item
  }
}

export default RestockReportAPI
