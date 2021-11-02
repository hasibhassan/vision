import React, {
  useEffect,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { AppReducer, initialState } from './AppReducer'
import { useSessionStorage } from 'react-use'

const AppContext = createContext()

export function AppContextWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  const [sessionStorageValue, setSessionStorageValue] = useSessionStorage(
    'visionState',
    state
  )

  useEffect(() => {
    // If there's already state in sessionStorage update the app state store w/ the sessionStorage state
    if (sessionStorageValue) {
      dispatch({ type: 'init_stored', value: sessionStorageValue })
    }
  }, [])

  useEffect(() => {
    // Create and/or set a new sessionStorage key named 'state'
    if (state !== initialState) {
      setSessionStorageValue(state)
    }
  }, [state])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
