import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'

const withAuth =
  (ProtectedComponent, route = '/profile') =>
  (props) => {
    const Router = useRouter()
    let isLoggedIn = false

    async function checkIfLoggedIn() {
      try {
        await Auth.currentAuthenticatedUser()
        isLoggedIn = true
      } catch (err) {
        // implement React Toast alerting "not logged in" using global ui state (context)
        console.log(err)
        Router.replace(route)
      }
    }

    useEffect(() => {
      checkIfLoggedIn()
    })

    if (!isLoggedIn) {
      return <h1>Loading...</h1>
    }

    return <ProtectedComponent {...props} />
  }

export default withAuth
