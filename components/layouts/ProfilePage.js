import { useMediaQuery } from 'react-responsive'
import withAuth from '@sections/HOC/withAuth'
import { Auth, API } from 'aws-amplify'
import { useRouter } from 'next/router'
import Spinner from '@ui/Spinner/Spinner'
import React, { useState, useEffect } from 'react'

const ProfilePage = () => {
  const [userData, setUserData] = useState()
  const [isLoaded, setIsLoaded] = useState()
  const Router = useRouter()

  const isMobile = useMediaQuery({
    maxWidth: 1024,
  })
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  })

  async function signOut() {
    try {
      await Auth.signOut()
      Router.replace('/')
    } catch (err) {
      console.log({ err })
    }
  }

  useEffect(() => {
    const getUserNameAndProfile = async () => {
      try {
        setIsLoaded(false)
        const { username: email } = await Auth.currentAuthenticatedUser()
        const response = await API.get('visionapi', `/users/${email}`, {})
        setUserData(response.Item)
        setIsLoaded(true)
      } catch (err) {
        console.log(err)
      }
    }

    getUserNameAndProfile()
  }, [])

  return (
    <div>
      {isMobile &&
        (!isLoaded ? (
          <Spinner />
        ) : (
          <p>
            Mobile profile content here: {userData.createdAt}
            <button onClick={signOut}>Sign Out</button>
          </p>
        ))}
      {isDesktop &&
        (!isLoaded ? (
          <Spinner />
        ) : (
          <p>
            Desktop profile content here : {userData.sub}
            <button onClick={signOut}>Sign Out</button>
          </p>
        ))}
    </div>
  )
}

export default withAuth(ProfilePage)
