import { useMediaQuery } from 'react-responsive'
import withAuth from '@sections/HOC/withAuth'
import { Auth } from '@aws-amplify/auth'
import { useRouter } from 'next/router'
import useGetProfile from '@utils/useGetProfile'
import Spinner from '@ui/Spinner/Spinner'
import React, { useState, useEffect } from 'react'

const ProfilePage = () => {
  const [userEmail, setUserEmail] = useState()
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
    const getUserEmail = async () => {
      try {
        const { username } = await Auth.currentAuthenticatedUser()
        setUserEmail(username)
      } catch (err) {
        console.log(err)
      }
    }

    getUserEmail()
  }, [])

  const { data, isLoading } = useGetProfile(userEmail)

  return (
    <div>
      {isMobile &&
        (isLoading ? (
          <Spinner />
        ) : (
          <p>
            Mobile profile content here: {data}
            <button onClick={signOut}>Sign Out</button>
          </p>
        ))}
      {isDesktop &&
        (isLoading ? (
          <Spinner />
        ) : (
          <p>
            Desktop profile content here : {data}
            <button onClick={signOut}>Sign Out</button>
          </p>
        ))}
    </div>
  )
}

export default withAuth(ProfilePage)
