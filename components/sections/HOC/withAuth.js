import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'
import Spinner from '@ui/Spinner/Spinner'

const withAuth =
  (ProtectedComponent, route = '/login') =>
  (props) => {
    const [isLoading, setIsLoading] = useState()
    const Router = useRouter()

    async function checkIfLoggedIn() {
      try {
        setIsLoading(true)
        await Auth.currentAuthenticatedUser()
        console.log('user found')
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
