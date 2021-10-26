import React, { useState } from 'react'
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory'
import format from 'date-fns/format'
import formatPrice from '@utils/formatPrice'
import useGetChartData from '@utils/useGetChartData'
import styles from './Home.module.css'

const intervals = [
  {
    label: 'Today',
    value: 1,
  },
  {
    label: 'This Week',
    value: 7,
  },
  {
    label: 'This Month',
    value: 30,
  },
  {
    label: 'This Quarter',
    value: 90,
  },
]

export default function ChartData({ cryptoName, isExpanded }) {
  const [dataInterval, setDataInterval] = useState(intervals[0].value)

  const { data, isLoading } = useGetChartData(cryptoName, dataInterval, {
    refetchInterval: 60000,
    staleTime: 60000,
    select: (data) =>
      data?.prices?.map((item) => ({
        x: item[0],
        y: item[1],
      })),
  })

  return (
    <div className={styles.chart}>
      <div className={styles.chartActions}>
        {intervals.map((interval) => (
          <button
            key={interval.value}
            className={
              dataInterval === interval.value ? styles.active : styles.inactive
            }
            onClick={() => setDataInterval(interval.value)}
          >
            {interval.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <span>Loading...</span>
        </div>
      ) : !isExpanded ? (
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
      ) : (
        <VictoryChart
          width={800}
          height={400}
          domainPadding={5}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => formatPrice(datum.y)}
              title={`${cryptoName} price data chart`}
              labelComponent={
                <VictoryTooltip
                  style={{
                    fill: '#333',
                    fontSize: 16,
                  }}
                  flyoutStyle={{
                    fill: '#fff',
                    stroke: '#fff',
                    strokeWidth: 1,
                    margin: 10,
                  }}
                />
              }
            />
          }
        >
          <VictoryLine
            style={{
              data: {
                stroke: '#fff',
                strokeWidth: 2,
              },
            }}
            data={data}
          />
          <VictoryAxis
            orientation="bottom"
            style={{
              axis: {
                stroke: '#fff',
                strokeWidth: 2,
              },
              tickLabels: {
                fill: '#fff',
              },
            }}
            tickFormat={(x) => {
              if (dataInterval === 1) {
                return format(x, 'p')
              }
              return format(x, 'MM/dd')
            }}
          />
        </VictoryChart>
      )}
    </div>
  )
}
