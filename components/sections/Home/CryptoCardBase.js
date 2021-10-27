import React, { useState } from 'react'
import useGetCardData from '@utils/useGetCardData'
import formatPrice from '@utils/formatPrice'
import formatPlusMinus from '@utils/formatPlusMinus'
import ChartData from './ChartData'
import Spinner from '@ui/Spinner/Spinner'
import styles from './Home.module.css'
import cx from 'classnames'

export default function CryptoCardBase({ cryptoName }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const { data, isLoading } = useGetCardData(cryptoName, {
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
  })

  if (isLoading) return <Spinner />

  const onCardClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
    }
  }

  const { image, name, market_data: marketData } = data

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
          <img
            src={image?.large}
            alt={`${name} logo`}
            className={styles.cardImg}
          />
          <h3 className={styles.cryptoName}>{name}</h3>
          <h4 className={styles.cryptoPrice}>
            {formatPrice(marketData?.current_price?.usd)}
            {formatPlusMinus(marketData?.price_change_percentage_24h)}
          </h4>
        </div>
        <ChartData isExpanded={isExpanded} cryptoName={cryptoName} />
      </div>
    </div>
  )
}
