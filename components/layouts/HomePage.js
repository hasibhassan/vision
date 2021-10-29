import DesktopGrid from '@sections/Home/DesktopGrid'
import { useMediaQuery } from 'react-responsive'

export default function HomePage() {
  const isMobile = useMediaQuery({
    maxWidth: 1024,
  })
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  })

  return (
    <div>
      {isMobile && <p>todo</p>}
      {isDesktop && <DesktopGrid />}
    </div>
  )
}
