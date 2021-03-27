import { isEmpty } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'
import { RootState } from '../reducers/rootReducer'

type PrivateRouteProps = {
  component: any
  exact?: boolean
  path: string
}

function PrivateRoute({ component, ...props }: PrivateRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user)
  if (!isEmpty(user)) {
    return <Route {...props} component={component} />
  }
  return <Redirect to="/login" />
}

export default PrivateRoute
