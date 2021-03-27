import { ToastProvider } from '@agney/ir-toast'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/float-elements.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/typography.css'
import { Redirect, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import ItemDetailView from './pages/ItemDetailView'
import LoginView from './pages/LoginView'
import RestockReportDetailView from './pages/RestockReportDetailView'
import RestockReportsView from './pages/RestockReportView'
/* Theme variables */
import './theme/variables.css'

const App: React.FC = () => {
  return (
    <div>
      <IonApp>
        <ToastProvider>
          <IonReactRouter>
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
          </IonReactRouter>
        </ToastProvider>
      </IonApp>
    </div>
  )
}

export default App
