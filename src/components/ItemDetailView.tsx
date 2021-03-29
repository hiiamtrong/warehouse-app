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
import { get } from 'lodash'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type ItemProps = {
  item: any
  handleCountMobile: any
}
type FormValues = {
  quantity: number
}
const ItemDetailView: React.FC<ItemProps> = ({ item, handleCountMobile }) => {
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

  const method = useForm<FormValues>({
    defaultValues: {
      quantity: 0,
    },
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

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
