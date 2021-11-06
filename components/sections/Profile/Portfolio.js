import { useAppContext } from '@utils/Context/AppContext'
import styles from './Portfolio.module.css'
import PortfolioListItem from './PortfolioListItem'

export default function Portfolio() {
  const { state } = useAppContext()
  const { portfolio } = state
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
            <ul>
              {portfolio.map((cryptoId, idx) => (
                <li key={idx}>
                  <PortfolioListItem cryptoId={cryptoId} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
