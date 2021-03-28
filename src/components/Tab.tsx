import {
  IonButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { pricetag, personCircle, reader, list } from 'ionicons/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'
import ItemDetailView from '../pages/ItemDetailView'
import LoginView from '../pages/LoginView'
import RestockReportDetailView from '../pages/RestockReportDetailView'
import RestockReportsView from '../pages/RestockReportView'
import { RootState } from '../reducers/rootReducer'
import PrivateRoute from './PrivateRoute'

export const TabMenu: React.FC = () => {
  const { item, restockReport } = useSelector(
    (state: RootState) => state.restockReport
  )
  const productId = item?.product?._id
  const restockReportId = restockReport?._id
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/login" exact component={LoginView} />
        <Redirect exact from="/" to="/restock-reports" />
        <PrivateRoute
          path="/restock-reports"
          exact
          component={RestockReportsView}
        />
        <PrivateRoute
          path="/restock-reports/:restockReportId"
          exact
          component={RestockReportDetailView}
        />
        <PrivateRoute
          path="/restock-reports/:restockReportId/view/:productId"
          component={ItemDetailView}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="restock-reports" href="/restock-reports">
          <IonIcon icon={list} />
          <IonLabel>Restock Reports</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="list-items"
          href={`/restock-reports/${restockReportId}`}
        >
          <IonIcon icon={reader} />
          <IonLabel>List Items</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="item-detail"
          href={`/restock-reports/${restockReportId}/view/${productId}`}
        >
          <IonIcon icon={pricetag} />
          <IonLabel>Item detail</IonLabel>
        </IonTabButton>

        <IonTabButton tab="staff">
          <IonIcon icon={personCircle} />
          <IonLabel>Staff</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
