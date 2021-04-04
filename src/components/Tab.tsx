import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { list, pricetag, reader } from 'ionicons/icons'
import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { AppContext } from '../context'
import ItemDetailView from '../pages/ItemDetail'
import LoginView from '../pages/LoginView'
import RestockReportDetailView from '../pages/RestockReportDetail'
import RestockReportsView from '../pages/RestockReportView'
import PrivateRoute from './PrivateRoute'
import { observer } from 'mobx-react-lite'
export const TabMenu = observer(() => {
  const { itemStore, restockReportStore } = useContext(AppContext)
  const { item } = itemStore
  const { restockReport } = restockReportStore
  const productId = item?.product?._id
  const restockReportId = restockReport?._id
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path='/login' exact component={LoginView} />
        <Redirect exact from='/' to='/restock-reports' />
        <PrivateRoute
          path='/restock-reports'
          exact
          component={RestockReportsView}
        />
        <PrivateRoute
          path='/restock-reports/:restockReportId'
          exact
          component={RestockReportDetailView}
        />
        <PrivateRoute
          path='/restock-reports/:restockReportId/view/:productId'
          component={ItemDetailView}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        <IonTabButton tab='restock-reports' href='/restock-reports'>
          <IonIcon icon={list} />
          <IonLabel>Restock Reports</IonLabel>
        </IonTabButton>

        <IonTabButton
          disabled={!restockReportId}
          tab='list-items'
          href={`/restock-reports/${restockReportId}`}
        >
          <IonIcon icon={reader} />
          <IonLabel>List Items</IonLabel>
        </IonTabButton>

        <IonTabButton
          disabled={!restockReportId || !productId}
          tab='item-detail'
          href={`/restock-reports/${restockReportId}/view/${productId}`}
        >
          <IonIcon icon={pricetag} />
          <IonLabel>Item detail</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
})
