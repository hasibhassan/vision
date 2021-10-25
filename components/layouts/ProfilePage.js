import { useMediaQuery } from 'react-responsive'
import withAuth from '@sections/HOC/withAuth'
import Auth from '@aws-amplify/auth'
import { useRouter } from 'next/router'

const ProfilePage = () => {
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
  return (
    <div>
      {isMobile && (
        <p>
          Mobile profile content here
          <button onClick={signOut}>Sign Out</button>
        </p>
      )}
      {isDesktop && (
        <p>
          Desktop profile content here
          <button onClick={signOut}>Sign Out</button>
        </p>
      )}
    </div>
  )
}

export default withAuth(ProfilePage)
