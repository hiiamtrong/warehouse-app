import React from 'react'
import { Redirect, Route } from 'react-router'
import useAuthenticaion from '../hook/useAuthentication'

type PrivateRouteProps = {
  component: any
  exact?: boolean
  path: string
}

function PrivateRoute({ component, ...props }: PrivateRouteProps) {
  const isAuthentication = useAuthenticaion()
  if (isAuthentication) {
    return <Route {...props} component={component} />
  }
  return <Redirect to="/login" />
}

export default PrivateRoute
