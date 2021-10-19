import React, {
  useEffect,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { AppReducer, initialState } from './AppReducer'

const AppContext = createContext()

export function AppContextWrapper({ children }) {
  const { state, dispatch } = useReducer(AppReducer, initialState)

  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  // TODO #13 refactor state store

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem('localstoragecontextstate'))) {
  //     // Check if there's already a state in localStorage
  //     dispatch({
  //       type: 'init_stored',
  //       value: JSON.parse(localStorage.getItem('localstoragecontextstate')),
  //       // If yes, update the current state with the stored one
  //     })
  //   }
  // }, [])

  // useEffect(() => {
  //   if (state !== initialState) {
  //     localStorage.setItem('localstoragecontextstate', JSON.stringify(state))
  //     // Create and/or set a new localStorage variable called "localstoragecontextstate"
  //   }
  // }, [state])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
