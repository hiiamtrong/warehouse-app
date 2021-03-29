import { yupResolver } from '@hookform/resolvers/yup'
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { find, findIndex, get, isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import * as yup from 'yup'
import withLoading from '../components/Loading'
import useNotify from '../libs/notify'
import Item from '../models/item'
import RestockReport from '../models/restock-report'
import { countMobile, fetchById, setItem } from '../reducers/restockReportSlice'
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

  let schema = yup.object().shape({
    quantity: yup
      .number()
      .max(
        item.restockQuantity,
        `Số lượng lấy tối đa là ${item.restockQuantity}`
      )
      .min(0, 'Số lượng tối thiểu là 0')
      .required('Please enter quantity'),
  })

  type FormValues = {
    quantity: number
  }
  const method = useForm<FormValues>({
    defaultValues: {
      quantity: 0,
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  async function handleCountMobile({ quantity }: { quantity: number }) {
    const restockReportId = get(restockReport, '_id')
    const productId = get(item, 'product._id')
    const itemIndex = findIndex(restockReport.items, (item: Item) => {
      return item.product._id === productId
    })
    const action = countMobile({ quantity, restockReportId, itemIndex })
    await dispatch(action)
  }

  return withLoading(ItemDetailViewLoading)({
    waiting,
    method,
    item,
    handleCountMobile,
  })
}

type ItemProps = {
  item: any
  method: any
  handleCountMobile: any
}
const ItemDetailViewLoading: React.FC<ItemProps> = ({
  item,
  method,
  handleCountMobile,
}) => {
  const { register, errors, handleSubmit } = method
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

              <form onSubmit={handleSubmit(handleCountMobile)}>
                <IonRow>
                  <IonCol className="ion-text-left">
                    <IonInput
                      type="number"
                      class="box"
                      name="quantity"
                      ref={register}
                      value={item.takenQuantity}
                      disabled={item.takenQuantity >= 0}
                    />
                  </IonCol>
                  <IonCol className="ion-text-right">
                    <IonButton type="submit">Điền</IonButton>
                  </IonCol>
                </IonRow>
                {errors && errors['quantity'] && (
                  <IonText color="danger" className="ion-padding-start">
                    <small>{errors['quantity'].message}</small>
                  </IonText>
                )}
              </form>
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default ItemDetailView
