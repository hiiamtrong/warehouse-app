import React from 'react'
import { RootStore } from './store'
const rootStore = new RootStore()
export const AppContext = React.createContext<RootStore>(rootStore)
