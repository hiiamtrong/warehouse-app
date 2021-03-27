import React, { useContext, useEffect } from 'react'

import { get, find, isEmpty } from 'lodash'
import {
  IonTitle,
  IonToolbar,
  IonHeader,
  IonPage,
  IonContent,
  IonImg,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCol,
  IonRow,
} from '@ionic/react'

import { RouteComponentProps } from 'react-router-dom'
import RestockReport from '../models/restock-report'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducers/rootReducer'
import { fetchById, setItem } from '../reducers/restockReportSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'

interface ItemDetailPageProps
  extends RouteComponentProps<{
    id: string
  }> {}

const ItemDetailView: React.FC<ItemDetailPageProps> = ({ match }) => {
  const restockReportState = useSelector(
    (state: RootState) => state.restockReport
  )
  const dispatch: AppDispatch = useDispatch()
  const { restockReport, item } = restockReportState
  useEffect(() => {
    const productId = get(match, 'params.productId')
    const restockReportId = get(match, 'params.restockReportId')
    async function getRestockReportDetail() {
      if (restockReportId) {
        if (isEmpty(restockReport) || restockReport._id !== restockReportId) {
          const action = fetchById(restockReportId)
          const result = await dispatch(action)
          const restockReport = unwrapResult(result)
          getProductDetail({ restockReport, productId })
        } else {
          getProductDetail({ restockReport, productId })
        }
      }
    }

    function getProductDetail({
      productId,
      restockReport,
    }: {
      productId: String
      restockReport: RestockReport
    }) {
      const newItem = find(get(restockReport, 'items', []), (item) => {
        return item.product._id === productId
      })
      const action = setItem(newItem)
      dispatch(action)
    }

    getRestockReportDetail()
  }, [match])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">
            {get(item, 'sku')} - {get(item, 'description')}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonCard>
          <IonImg src={get(item, 'product.imageLink', '')} />
          <IonCardHeader className="ion-text-center">
            <IonCardTitle>
              <IonRow>
                <IonCol className="ion-text-left">
                  {get(item, 'currentLocation.code', '')}
                </IonCol>
              </IonRow>
              <br></br>
              <IonRow>
                <IonCol className="ion-text-left">
                  {'Tồn kho'} {get(item, 'khoQuantity', '')}
                </IonCol>
                <IonCol className="ion-text-right">
                  {'Cần lấy'} {get(item, 'restockQuantity', '')}
                </IonCol>
              </IonRow>
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default ItemDetailView
