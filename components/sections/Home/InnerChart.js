import { VictoryLine } from 'victory'
import styles from './InnerCard.module.css'

export default function InnerChart({ data, isLoading }) {
  return (
    <div className={styles.chart}>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <span>Loading...</span>
        </div>
      ) : (
        <VictoryLine
          style={{
            data: {
              stroke: '#fff',
              strokeWidth: 2,
            },
          }}
          width={300}
          height={150}
          data={data}
        />
      )}
    </div>
  )
}
