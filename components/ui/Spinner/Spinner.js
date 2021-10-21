import LoadingSpinner from '@commercetools-uikit/loading-spinner'
import styles from './Spinner.module.css'

export default function Spinner() {
  return (
    <div className={styles.center}>
      <LoadingSpinner size="s" maxDelayDuration={0}>
        Loading
      </LoadingSpinner>
    </div>
  )
}
