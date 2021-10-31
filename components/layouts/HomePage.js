import DesktopGrid from '@sections/Home/DesktopGrid'
import { useMediaQuery } from 'react-responsive'
import Head from 'next/head'

export default function HomePage() {
  const isMobile = useMediaQuery({
    maxWidth: 1024,
  })
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  })

  return (
    <div>
      <Head>
        <title>Vision</title>
      </Head>
      {isMobile && <p>todo</p>}
      {isDesktop && <DesktopGrid />}
    </div>
  )
}
