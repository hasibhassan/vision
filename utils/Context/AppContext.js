import React, {
  useEffect,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { AppReducer, initialState } from './AppReducer'
import { useSessionStorage } from 'react-use'
import { Auth, API } from 'aws-amplify'

const AppContext = createContext()

export function AppContextWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])

  // const [sessionStorageValue, setSessionStorageValue] = useSessionStorage(
  //   'visionState',
  //   state
  // )

  const checkIsAuth = async () => {
    try {
      const { username } = await Auth.currentAuthenticatedUser()
      if (username) {
        return true
      }
    } catch (err) {
      return false
    }
  }

  useEffect(() => {
    // Get the server state and initialize the local state store with that if the user is signed in

    const initServerState = async () => {
      const { username: email } = await Auth.currentAuthenticatedUser()
      const response = await API.get('visionapi', `/users/${email}`, {})
      const userItem = response.Item.contextstate
      const serverState = JSON.parse(userItem)
      console.log('the state retreived from the server is:', serverState)
      dispatch({ type: 'init_stored', value: serverState })
    }
    const isAuth = checkIsAuth()

    if (isAuth) {
      initServerState()
    }

    // If there's already state in sessionStorage update the app state store w/ the sessionStorage state
    // if (sessionStorageValue) {
    //   dispatch({ type: 'init_stored', value: sessionStorageValue })
    // }
  }, [])

  useEffect(() => {
    // Create and/or set a new sessionStorage key named 'state'
    // if (state !== initialState) {
    //   setSessionStorageValue(state)
    // }

    // Update DynamoDB user item with the current state object
    const updateDB = async (state) => {
      try {
        const {
          attributes: { email },
        } = await Auth.currentAuthenticatedUser()
        const response = await API.get('visionapi', `/users/${email}`, {})
        const userItem = response.Item
        const myInit = { body: { contextState: state } }

        if (!userItem.state || userItem.state !== state) {
          await API.post('visionapi', `/users/${email}`, myInit)
        }
      } catch (err) {
        console.log(err)
      }
    }

    // If the user is signed in then update the server state on every state change
    const isAuth = checkIsAuth()

    if (isAuth) {
      updateDB(state)
    }
  }, [state])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
