import styles from './InnerCard.module.css'
import formatPrice from '@utils/formatPrice'
import formatPlusMinus from '@utils/formatPlusMinus'
import ChartData from './ChartData'
import largeCurrencyFormatter from '@utils/largeCurrencyFormatter'
import React, { useState } from 'react'
import useGetChartData from '@utils/useGetChartData'
import InnerChart from './InnerChart'

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

export default function InnerCard({
  setIsExpanded,
  name,
  symbol,
  currentPrice,
  priceChangePercentageDaily,
  volume,
  id,
  marketCap,
  isExpanded,
  image,
  data,
  isLoading,
}) {
  return (
    <div className={styles.card}>
      <button onClick={() => setIsExpanded(true)} className={styles.hitzone} />
      <div className={styles.cardInner}>
        <div className={styles.topData}>
          <img src={image} alt={`${name}`} className={styles.cardImg} />
          <div className={styles.cryptoNameWrap}>
            <h1 className={styles.cryptoName}>{name}</h1>
            <p className={styles.cryptoSymbol}>{symbol}</p>
          </div>
          <h4 className={styles.cryptoPrice}>
            {formatPrice(currentPrice)}
            {formatPlusMinus(priceChangePercentageDaily)}
          </h4>
          <p className={styles.cryptoMarketcap}>
            Market Cap: ${largeCurrencyFormatter(marketCap)}
          </p>
          <p className={styles.cryptoVolume}>
            Volume: ${largeCurrencyFormatter(volume)}
          </p>
        </div>
        <InnerChart isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}
