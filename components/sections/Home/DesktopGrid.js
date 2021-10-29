import styles from './DesktopGrid.module.css'
import useGetCardData from '@utils/useGetCardData'
import CryptoCardBase from './CryptoCardBase'
import Spinner from '@ui/Spinner/Spinner'

export default function DesktopGrid() {
  const { data, isLoading } = useGetCardData({
    refetchInterval: 60000,
    staleTime: 60000,
  })

  if (isLoading) return <Spinner />

  return (
    <div className={styles.cardGrid}>
      {data.map((crypto) => {
        return (
          <CryptoCardBase
            key={crypto.id}
            symbol={crypto.symbol}
            name={crypto.name}
            image={crypto.image}
            currentPrice={crypto.current_price}
            marketCap={crypto.market_cap}
            volume={crypto.total_volume}
            priceChangePercentageDaily={crypto.price_change_percentage_24h}
            id={crypto.id}
          />
        )
      })}
    </div>
  )
}
