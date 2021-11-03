import { useAppContext } from '@utils/Context/AppContext'
import styles from './Portfolio.module.css'

export default function Portfolio({ userData }) {
  const { state } = useAppContext()
  const { portfolio } = state
  return (
    <div>
      {portfolio.length === 0 && <p>You have no coins in your portfolio</p>}
      <h1 className={styles.header}>Account Email is: {userData.user}</h1>
    </div>
  )
}
