import { VictoryLine } from 'victory'
import useGetChartData from '@utils/useGetChartData'
import styles from './CoinCard.module.css'

export default function InnerCoinChart({ id }) {
  const { data, isLoading } = useGetChartData(id, 1, {
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
    select: (data) =>
      data?.prices?.map((item) => ({
        x: item[0],
        y: item[1],
      })),
  })
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
