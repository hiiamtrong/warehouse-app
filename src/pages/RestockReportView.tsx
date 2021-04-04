import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { map } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import RestockReportAPI from '../api/restockReportAPI'
import Loading from '../components/Loading'
import useNotify from '../libs/notify'
import RestockReport from '../models/restock-report'

const RestockReportsView: React.FC = () => {
  const history = useHistory()
  const [restockReports, setRestockReports] = useState<[] | RestockReport[]>([])
  async function goToRestockReport(_id: String) {
    history.push('/restock-reports/' + _id, { direction: 'none' })
  }

  const [waiting, setWaiting] = useState(true)
  const notify = useNotify()

  useEffect(() => {
    async function getRestockReports() {
      const restockReports = await RestockReportAPI.getAll().catch((err) => {
        notify.errorFromServer(err)
      })
      setRestockReports(restockReports)
    }
    getRestockReports().finally(() => {
      setWaiting(false)
    })
  }, [])

  return Loading(RestockReportsViewLoading)({
    waiting,
    restockReports,
    goToRestockReport,
  })
}

type RestockReportsProps = {
  restockReports: any
  goToRestockReport: any
}
const RestockReportsViewLoading = function ({
  restockReports,
  goToRestockReport,
}: RestockReportsProps) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='ion-padding ion-text-center'>
            Restock Reports{' '}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding ion-text-center'>
        <IonGrid>
          {map(restockReports, (restockReport) => {
            return (
              <IonCard
                key={restockReport.restockReportId}
                onClick={() => goToRestockReport(restockReport._id)}
              >
                <IonItem>
                  <IonLabel className='ion-text-center'>
                    <IonRow>
                      <IonCol>{restockReport.restockReportId}</IonCol>
                      <IonCol>
                        {restockReport.warehouseRestock.code}
                        {' => '}
                        {restockReport.outlet.code}
                      </IonCol>
                    </IonRow>
                  </IonLabel>
                </IonItem>

                <IonCardContent>
                  {'Số sản phẩm restock'} {restockReport.numRestockItems}
                </IonCardContent>
              </IonCard>
            )
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default RestockReportsView
