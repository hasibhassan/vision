import Spinner from '@ui/Spinner/Spinner'
import { useAppContext } from '@utils/Context/AppContext'
import useGetPortfolioData from '@utils/useGetPortfolioData'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  const { state } = useAppContext()
  const { portfolio } = state
  let cryptoUrlStr = JSON.stringify(portfolio).replace(/[\[\]"]+/g, '')
  cryptoUrlStr = encodeURIComponent(cryptoUrlStr)
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoUrlStr}&vs_currencies=usd`
  const { data, isLoading } = useGetPortfolioData(url, {
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
  })

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className={styles.outsideContainer}>
      {portfolio.length === 0 && (
        <p className={styles.emptyState}>
          You haven't liked any cryptocurrencies for your portfolio
        </p>
      )}
      {portfolio.length > 0 && (
        <div>
          <div>
            <p className={styles.header}>My Saved Coins</p>
            <ul className={styles.items}>
              {portfolio.map((cryptoId, idx) => (
                <li key={idx}>
                  <span>{cryptoId}: </span>
                  <span>{`$${data[cryptoId].usd}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
