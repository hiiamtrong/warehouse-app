import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { get, map } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import Loading from '../components/Loading'
import { fetchById } from '../reducers/restockReportSlice'
import { RootState } from '../reducers/rootReducer'
import { AppDispatch } from '../store'

interface RestockReportDetailPageProps
  extends RouteComponentProps<{
    id: string
  }> {}

const RestockReportDetailView: React.FC<RestockReportDetailPageProps> = ({
  match,
}) => {
  const history = useHistory()
  const [waiting, setWaiting] = useState(true)
  const restockReport = useSelector(
    (state: RootState) => state.restockReport.restockReport
  )
  const dispatch: AppDispatch = useDispatch()

  function viewProductDetail(productId: String) {
    const restockReportId = restockReport._id
    history.push('/restock-reports/' + restockReportId + '/view/' + productId, {
      direction: 'none',
    })
  }
  useEffect(() => {
    async function getRestockReportDetail() {
      const restockReportId = get(match, 'params.restockReportId')
      if (restockReportId) {
        const action = fetchById(restockReportId)
        await dispatch(action)
      }
    }

    getRestockReportDetail().finally(() => {
      setWaiting(false)
    })
  }, [match])

  return Loading(RestockReportDetailViewLoading)({
    waiting,
    restockReport,
    viewProductDetail,
  })
}
type RestockReportProps = {
  restockReport: any
  viewProductDetail: any
}
const RestockReportDetailViewLoading: React.FC<RestockReportProps> = ({
  restockReport,
  viewProductDetail,
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Restock Report {get(restockReport, 'restockReportId')}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          {map(get(restockReport, 'items', []), (item) => {
            return (
              <IonCard
                key={item.sku}
                onClick={() => viewProductDetail(get(item, 'product._id'))}
              >
                <IonCardHeader className="ion-text-center">
                  <IonCardTitle>
                    <IonRow>
                      <IonCol className="ion-text-left">
                        {item.sku} - {item.description}
                      </IonCol>
                      <IonCol className="ion-text-right">
                        {get(item, 'currentLocation.code', '')}
                      </IonCol>
                    </IonRow>
                    <br></br>
                    <IonRow>
                      <IonCol className="ion-text-left">
                        {'Tồn kho'} {item.khoQuantity}
                      </IonCol>
                      <IonCol className="ion-text-right">
                        {'Cần lấy'} {item.restockQuantity}
                      </IonCol>
                    </IonRow>
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            )
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default RestockReportDetailView
