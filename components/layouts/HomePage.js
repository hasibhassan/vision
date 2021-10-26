import CryptoCardBase from '@sections/Home/CryptoCardBase'
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
      {isMobile && <CryptoCardBase cryptoName={'bitcoin'} />}
      {isDesktop && <CryptoCardBase cryptoName={'bitcoin'} />}
    </div>
  )
}
