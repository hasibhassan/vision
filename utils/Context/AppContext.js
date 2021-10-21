import React, {
  useEffect,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { AppReducer, initialState } from './AppReducer'
import { useLocalStorage } from 'react-use'

const AppContext = createContext()

export function AppContextWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    'state',
    state
  )

  useEffect(() => {
    // If there's already state in localStorage update the app state store w/ the localStorage state
    if (localStorageValue) {
      dispatch({ type: 'init_stored', value: localStorageValue })
    }
  }, [])

  useEffect(() => {
    // Create and/or set a new localStorage key named 'state'
    if (state !== initialState) {
      setLocalStorageValue(state)
    }
  }, [state])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
