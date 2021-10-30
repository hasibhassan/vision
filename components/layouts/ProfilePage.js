import { useMediaQuery } from 'react-responsive'
import withAuth from '@sections/HOC/withAuth'
import { Auth } from '@aws-amplify/auth'
import { useRouter } from 'next/router'
import useGetProfile from '@utils/useGetProfile'
import Spinner from '@ui/Spinner/Spinner'
import { useAppContext } from '@utils/Context/AppContext'

const ProfilePage = () => {
  const { state, dispatch } = useAppContext()
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

  const { data, isLoading } = useGetProfile(state?.user?.email)

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
