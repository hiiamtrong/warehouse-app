import { yupResolver } from '@hookform/resolvers/yup'
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { personCircle } from 'ionicons/icons'
import { isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import useNotify from '../libs/notify'
import { RootState } from '../reducers/rootReducer'
import { login } from '../reducers/userSlice'
import { AppDispatch } from '../store'

let schema = yup.object().shape({
  username: yup.string().required('Please enter a valid username'),
  password: yup.string().required('Please enter a valid password'),
})

type FormValues = {
  username: string
  password: string
}

const LoginView: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth)
  const { user } = auth
  const notify = useNotify()
  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()

  const { register, handleSubmit, errors } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const handleLogin: SubmitHandler<FormValues> = async ({
    username,
    password,
  }) => {
    const action = login({ username, password })
    await dispatch(action).then((action) => {
      if (action.type.match(/rejected/)) {
        notify.errorFromServer(action.payload)
      } else {
        notify.success('Đăng nhập thành công')
      }
    })
  }
  useEffect(() => {
    checkLogin()
  }, [user])
  function checkLogin() {
    if (!isEmpty(user)) {
      history.push('/restock-reports')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding ion-text-center">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonIcon
                  style={{ fontSize: '70px', color: '#0040ff' }}
                  icon={personCircle}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Username</IonLabel>
                  <IonInput
                    type="text"
                    name="username"
                    ref={register}
                  ></IonInput>
                  {errors && errors['username'] && (
                    <IonText color="danger" className="ion-padding-start">
                      <small>{errors['username'].message}</small>
                    </IonText>
                  )}
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating"> Password</IonLabel>
                  <IonInput
                    type="password"
                    name="password"
                    ref={register}
                  ></IonInput>
                  {errors && errors['password'] && (
                    <IonText color="danger" className="ion-padding-start">
                      <small>{errors['password'].message}</small>
                    </IonText>
                  )}
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton expand="block" type="submit">
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </form>
  )
}

export default LoginView
