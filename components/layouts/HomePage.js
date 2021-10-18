import Dashboard from '@sections/Dashboard/Dashboard'
import { useMediaQuery } from 'react-responsive'

export default function HomePage() {
  const isMobile = useMediaQuery({
    maxWidth: 1024,
  })
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  })
  return (
    <Dashboard>
      {isMobile && <p>Mobile content here</p>}
      {isDesktop && <p>Desktop content here</p>}
    </Dashboard>
  )
}
