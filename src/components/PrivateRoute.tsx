import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { AppContext } from '../context'

type PrivateRouteProps = {
  component: any
  exact?: boolean
  path: string
}

function PrivateRoute({ component, ...props }: PrivateRouteProps) {
  const { authenticationStore } = useContext(AppContext)
  if (authenticationStore.isAuthenticated) {
    return <Route {...props} component={component} />
  }
  return <Redirect to="/login" />
}

export default PrivateRoute
