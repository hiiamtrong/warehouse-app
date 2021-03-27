import apiClient from '../libs/apiClient'
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
    }
}

export default RestockReportAPI