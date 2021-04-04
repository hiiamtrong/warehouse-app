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
  IonToolbar,
} from '@ionic/react'
import { personCircle } from 'ionicons/icons'
import React, { useContext, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import withLoading from '../components/Loading'
import { AppContext } from '../context'
import useNotify from '../libs/notify'
import { observer } from 'mobx-react-lite'
let schema = yup.object().shape({
  username: yup.string().required('Please enter a valid username'),
  password: yup.string().required('Please enter a valid password'),
})

type FormValues = {
  username: string
  password: string
}

const LoginView = observer(() => {
  const notify = useNotify()
  const history = useHistory()

  const { authenticationStore } = useContext(AppContext)

  const method = useForm<FormValues>({
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
    await authenticationStore
      .login(username, password)
      .then(() => {
        notify.success('Đăng nhập thành công')
      })
      .catch((err) => {
        notify.errorFromServer(err)
      })
  }
  useEffect(() => {
    checkLogin()
  }, [authenticationStore.isAuthenticated])

  function checkLogin() {
    if (authenticationStore.isAuthenticated) {
      history.push('/restock-reports')
    }
  }
  return withLoading(LoginViewLoading)({
    waiting: authenticationStore.waiting,
    method,
    handleLogin,
  })
})

type FormProps = {
  method: any
  handleLogin: any
}
const LoginViewLoading: React.FC<FormProps> = ({ method, handleLogin }) => {
  const { register, handleSubmit, errors } = method
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className='ion-padding ion-text-center'>
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
                  <IonLabel position='floating'>Username</IonLabel>
                  <IonInput
                    type='text'
                    name='username'
                    ref={register}
                  ></IonInput>
                  {errors && errors['username'] && (
                    <IonText color='danger' className='ion-padding-start'>
                      <small>{errors['username'].message}</small>
                    </IonText>
                  )}
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'> Password</IonLabel>
                  <IonInput
                    type='password'
                    name='password'
                    ref={register}
                  ></IonInput>
                  {errors && errors['password'] && (
                    <IonText color='danger' className='ion-padding-start'>
                      <small>{errors['password'].message}</small>
                    </IonText>
                  )}
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton expand='block' type='submit'>
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
