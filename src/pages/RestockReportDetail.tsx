import { get } from 'lodash'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Loading from '../components/Loading'
import RestockReportDetailView from '../components/RestockReportDetailView'
import { AppContext } from '../context'
import useNotify from '../libs/notify'

const RestockReportDetail = observer(() => {
  const history = useHistory()
  const { restockReportStore } = useContext(AppContext)
  const { restockReport, waiting, fetchById } = restockReportStore
  const match = useRouteMatch()
  const notify = useNotify()
  function viewProductDetail(productId: String) {
    const restockReportId = restockReport?._id
    history.push('/restock-reports/' + restockReportId + '/view/' + productId, {
      direction: 'none',
    })
  }

  const restockReportId = get(match, 'params.restockReportId')

  useEffect(() => {
    async function getRestockReportDetail() {
      if (restockReportId) {
        await fetchById(restockReportId).catch((err) => {
          notify.errorFromServer(err)
        })
      }
    }
    getRestockReportDetail()
  }, [])

  return (
    <RestockReportDetailView
      restockReport={restockReport}
      viewProductDetail={viewProductDetail}
    />
  )
})
export default RestockReportDetail
