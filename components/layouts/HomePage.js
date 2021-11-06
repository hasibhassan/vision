import DesktopGrid from '@sections/Home/DesktopGrid'
import CoinCard from '@sections/Home/CoinCards/CoinCard'
import { useMediaQuery } from 'react-responsive'
import Head from 'next/head'

export default function HomePage() {
  const isMobile = useMediaQuery({
    maxWidth: 1024,
  })

  return (
    <div>
      <Head>
        <title>Vision</title>
      </Head>
      {isMobile && <CoinCard />}
      <DesktopGrid />
    </div>
  )
}
