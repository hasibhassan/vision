import { useMediaQuery } from 'react-responsive'
import withAuth from '@sections/HOC/withAuth'

const ProfilePage = () => {
  const isMobile = useMediaQuery({
    maxWidth: 1024,
  })
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  })
  return (
    <div>
      {isMobile && <p>Mobile profile content here</p>}
      {isDesktop && <p>Desktop profile content here</p>}
    </div>
  )
}

export default withAuth(ProfilePage)
