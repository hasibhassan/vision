import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'
import Spinner from '@ui/Spinner/Spinner'
import { useAppContext } from '@utils/Context/AppContext'

const withAuth =
  (ProtectedComponent, route = '/login') =>
  (props) => {
    const [isLoading, setIsLoading] = useState()
    const Router = useRouter()
    const { state, dispatch } = useAppContext()

    async function checkIfLoggedIn() {
      try {
        setIsLoading(true)
        const { username } = await Auth.currentAuthenticatedUser()
        console.log('user found')
        dispatch({ type: 'update_user_email', value: username })
        setIsLoading(false)
      } catch (err) {
        // implement toast alerting "not logged in" using global ui state (context)
        console.log({ err })
        Router.replace(route)
      }
    }

    useEffect(() => {
      checkIfLoggedIn()
    }, [])

    if (isLoading) {
      return <Spinner />
    } else {
      return <ProtectedComponent {...props} />
    }
  }

export default withAuth
