import { useContext } from 'react'
import { AppContext } from '../context'

function useAuthenticaion() {
  const { authenticationStore } = useContext(AppContext)

  return authenticationStore.isAuthenticated
}

export default useAuthenticaion
