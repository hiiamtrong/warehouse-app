import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react'
import { personCircle } from 'ionicons/icons'
import { isEmpty } from 'lodash'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../context'
import './Menu.css'

interface AppPage {
  url: string
  iosIcon: string
  mdIcon: string
  title: string
}

const appPages: AppPage[] = [
  {
    title: 'Login',
    url: '/login',
    iosIcon: personCircle,
    mdIcon: personCircle,
  },
  {
    title: 'Restock Reports',
    url: '/restock-reports',
    iosIcon: personCircle,
    mdIcon: personCircle,
  },
]

const Menu = observer(() => {
  const location = useLocation()

  const { authenticationStore } = useContext(AppContext)
  const { user } = authenticationStore
  return (
    <IonMenu contentId='main' type='overlay'>
      <IonContent>
        <IonList id='inbox-list'>
          <IonListHeader>
            {!isEmpty(user) ? user?.displayName : 'Không xác định'}
          </IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? 'selected' : ''
                  }
                  routerLink={appPage.url}
                  routerDirection='none'
                  lines='none'
                  detail={false}
                >
                  <IonIcon
                    slot='start'
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            )
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  )
})

export default Menu
