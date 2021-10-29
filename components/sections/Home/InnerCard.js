import styles from './InnerCard.module.css'
import formatPrice from '@utils/formatPrice'
import formatPlusMinus from '@utils/formatPlusMinus'
import largeCurrencyFormatter from '@utils/largeCurrencyFormatter'
import InnerChart from './InnerChart'

export default function InnerCard({
  setIsExpanded,
  name,
  symbol,
  currentPrice,
  priceChangePercentageDaily,
  volume,
  marketCap,
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
