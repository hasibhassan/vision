import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'
import Spinner from '@ui/Spinner/Spinner'

const withAuth =
  (ProtectedComponent, route = '/login') =>
  (props) => {
    const Router = useRouter()
    let isLoggedIn = false

    async function checkIfLoggedIn() {
      try {
        await Auth.currentAuthenticatedUser()
        isLoggedIn = true
      } catch (err) {
        // implement toast alerting "not logged in" using global ui state (context)
        console.log(err)
        Router.replace(route)
      }
    }

    useEffect(() => {
      checkIfLoggedIn()
    })

    if (!isLoggedIn) {
      return <Spinner />
    }

    return <ProtectedComponent {...props} />
  }

export default withAuth
