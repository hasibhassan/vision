import LoadingSpinner from '@commercetools-uikit/loading-spinner'
import styles from './Spinner.module.css'
import Head from 'next/head'

export default function Spinner() {
  return (
    <div className={styles.center}>
      <Head>
        <title>Loading</title>
      </Head>
      <LoadingSpinner size="s" maxDelayDuration={0}>
        Loading
      </LoadingSpinner>
    </div>
  )
}
