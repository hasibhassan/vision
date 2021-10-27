import React, { useState } from 'react'
import formatPrice from '@utils/formatPrice'
import formatPlusMinus from '@utils/formatPlusMinus'
import ChartData from './ChartData'
import styles from './Home.module.css'
import cx from 'classnames'
import largeCurrencyFormatter from '@utils/largeCurrencyFormatter'

export default function CryptoCardBase({
  symbol,
  name,
  image,
  currentPrice,
  marketCap,
  volume,
  priceChangePercentageDaily,
  id,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const onCardClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
    }
  }

  return (
    <div
      className={
        isExpanded
          ? cx(styles.card, styles.expanded)
          : cx(styles.card, styles.collapsed)
      }
    >
      {!isExpanded && (
        <button onClick={onCardClick} className={styles.hitzone} />
      )}
      <div className={styles.cardInner}>
        {isExpanded && (
          <button className={styles.close} onClick={() => setIsExpanded(false)}>
            Close
          </button>
        )}
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
        <ChartData isExpanded={isExpanded} cryptoName={id} />
      </div>
    </div>
  )
}
