import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { filterCircle } from 'ionicons/icons'
import { filter, get, map } from 'lodash'
import React, { useMemo, useState } from 'react'

type RestockReportProps = {
  restockReport: any
  viewProductDetail: any
}
const RestockReportDetailView: React.FC<RestockReportProps> = ({
  restockReport,
  viewProductDetail,
}) => {
  const [status, setStatus] = useState('all')
  const filterRestockReportItems = filter(restockReport.items, (item) => {
    if (status === 'all') {
      return true
    }
    if (status === 'taken-enough') {
      return item.takenQuantity === item.restockQuantity
    }
    if (status === 'taken-missing') {
      return (
        item.takenQuantity >= 0 && item.takenQuantity !== item.restockQuantity
      )
    }
  })
  const filterItems = useMemo(() => {
    return filterRestockReportItems
  }, [status])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonCol className="ion-text-left">
            <IonTitle>
              Restock Report {get(restockReport, 'restockReportId')}
            </IonTitle>
          </IonCol>
          <IonItem>
            <IonIcon icon={filterCircle}></IonIcon>
            <IonLabel>Filter</IonLabel>
            <IonSelect
              value={status}
              placeholder="Select One"
              onIonChange={(e) => setStatus(e.detail.value)}
            >
              <IonSelectOption value="all">Tất cả</IonSelectOption>
              <IonSelectOption value="taken-enough">Đã lấy đủ</IonSelectOption>
              <IonSelectOption value="taken-missing">
                Đã lấy thiếu
              </IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          {map(filterItems, (item) => {
            return (
              <IonCard
                color={
                  item.takenQuantity === item.restockQuantity
                    ? 'success'
                    : 'light'
                }
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
                    {item.takenQuantity >= 0 && (
                      <IonRow>
                        <IonCol className="ion-text-left"></IonCol>
                        <IonCol className="ion-text-right">
                          {'Đã lấy'} {item.takenQuantity}
                        </IonCol>
                      </IonRow>
                    )}
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
