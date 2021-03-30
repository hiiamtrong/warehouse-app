import { get } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import Loading from '../components/Loading'
import RestockReportDetailView from '../components/RestockReportDetailView'
import useNotify from '../libs/notify'
import { fetchById } from '../reducers/restockReportSlice'
import { RootState } from '../reducers/rootReducer'
import { AppDispatch } from '../store'

interface RestockReportDetailPageProps
  extends RouteComponentProps<{
    id: string
  }> {}

const RestockReportDetail: React.FC<RestockReportDetailPageProps> = ({
  match,
}) => {
  const history = useHistory()
  const { restockReport, waiting } = useSelector(
    (state: RootState) => state.restockReport
  )
  const dispatch: AppDispatch = useDispatch()

  const notify = useNotify()

  function viewProductDetail(productId: String) {
    const restockReportId = restockReport._id
    history.push('/restock-reports/' + restockReportId + '/view/' + productId, {
      direction: 'none',
    })
  }
  const restockReportId = get(match, 'params.restockReportId')
  useEffect(() => {
    async function getRestockReportDetail() {
      console.log(restockReportId)
      if (restockReportId) {
        const action = fetchById(restockReportId)
        await dispatch(action).catch((err) => {
          notify.errorFromServer(err)
        })
      }
    }

    getRestockReportDetail()
  }, [])

  return Loading(RestockReportDetailView)({
    waiting,
    restockReport,
    viewProductDetail,
  })
}

export default RestockReportDetail
