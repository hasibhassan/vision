import LoadingSpinner from '@commercetools-uikit/loading-spinner'

export default function Spinner() {
  return (
    <div className={styles.center}>
      <LoadingSpinner size="s">Loading</LoadingSpinner>
    </div>
  )
}
