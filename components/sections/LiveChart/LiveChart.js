import styles from './LiveChart.module.css'

export default function LiveChart({ price }) {
  const opts = {
    tooltips: {
      intersect: false,
      mode: 'index',
    },
    responsive: true,
    maintainAspectRatio: false,
  }
  if (price === '0.00') {
    return <h2>Select a currency</h2>
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.priceContainer}>
        <div className={styles.priceContainerInner}>
          <h2 className={styles.price}>{`$${price}`}</h2>
        </div>
      </div>
    </div>
  )
}
