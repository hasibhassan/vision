import { useMediaQuery } from 'react-responsive'
import Dashboard from '@sections/Dashboard/Dashboard'
import Card from '@ui/Cards/Card'

export default function NewsPage() {
  const isMobile = useMediaQuery({
    maxWidth: 1024,
  })
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  })
  return (
    <Dashboard>
      {isMobile && <Card />}
      {isDesktop && <p>Desktop content here</p>}
    </Dashboard>
  )
}
