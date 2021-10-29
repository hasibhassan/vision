import { Line } from 'react-chartjs-2'
import styles from './LiveChart.module.css'

export default function LiveChart({ price, data }) {
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
      <h2>{`$${price}`}</h2>
      <div className={styles.chartContainer}>
        {/* <Line data={data} options={opts} /> */}
      </div>
    </div>
  )
}
