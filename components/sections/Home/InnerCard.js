import styles from './InnerCard.module.css'
import formatPrice from '@utils/formatPrice'
import formatPlusMinus from '@utils/formatPlusMinus'
import ChartData from './ChartData'
import largeCurrencyFormatter from '@utils/largeCurrencyFormatter'

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
        <ChartData isExpanded={isExpanded} cryptoName={id} />
      </div>
    </div>
  )
}
