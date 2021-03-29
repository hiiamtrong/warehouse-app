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

type ItemProps = {
  item: any
  method: any
  handleCountMobile: any
}

const ItemDetailView: React.FC<ItemProps> = ({
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
