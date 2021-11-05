import { useAppContext } from '@utils/Context/AppContext'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  const { state } = useAppContext()
  const { portfolio } = state
  return (
    <div className={styles.outsideContainer}>
      {portfolio.length === 0 && (
        <p className={styles.emptyState}>
          You haven't liked any coins for your portfolio
        </p>
      )}
    </div>
  )
}
