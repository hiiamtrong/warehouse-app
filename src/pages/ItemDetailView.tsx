import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { find, get, isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import withLoading from '../components/Loading'
import useNotify from '../libs/notify'
import RestockReport from '../models/restock-report'
import { fetchById, setItem } from '../reducers/restockReportSlice'
import { RootState } from '../reducers/rootReducer'
import { AppDispatch } from '../store'

interface ItemDetailPageProps
  extends RouteComponentProps<{
    id: string
  }> {}

const ItemDetailView: React.FC<ItemDetailPageProps> = ({ match }) => {
  const { restockReport, item, waiting } = useSelector(
    (state: RootState) => state.restockReport
  )
  const dispatch: AppDispatch = useDispatch()
  const notify = useNotify()
  useEffect(() => {
    const productId = get(match, 'params.productId')
    const restockReportId = get(match, 'params.restockReportId')
    async function getRestockReportDetail() {
      if (restockReportId) {
        if (isEmpty(restockReport) || restockReport?._id !== restockReportId) {
          const action = fetchById(restockReportId)
          await dispatch(action).catch((err) => {
            notify.errorFromServer(err)
          })
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
      if (newItem) {
        const action = setItem(newItem)
        dispatch(action)
      }
    }

    getRestockReportDetail()
  }, [match])

  return withLoading(ItemDetailViewLoading)({ waiting, item })
}

type ItemProps = {
  item: any
}
const ItemDetailViewLoading: React.FC<ItemProps> = ({ item }) => {
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
