import withAuth from '@sections/HOC/withAuth'
import { Auth, API } from 'aws-amplify'
import Spinner from '@ui/Spinner/Spinner'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Tabs from '@ui/Tabs/Tabs'

const ProfilePage = () => {
  const [userData, setUserData] = useState()
  const [isLoaded, setIsLoaded] = useState()

  useEffect(() => {
    getUserNameAndProfile()
  }, [])

  async function getUserNameAndProfile() {
    try {
      setIsLoaded(false)
      const {
        attributes: { email },
      } = await Auth.currentAuthenticatedUser()
      const response = await API.get('visionapi', `/users/${email}`, {})
      setUserData(response.Item)
      setIsLoaded(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      {!isLoaded ? <Spinner /> : <Tabs userData={userData} />}
    </div>
  )
}

export default withAuth(ProfilePage)
