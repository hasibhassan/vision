import styles from './ExpandedCard.module.css'
import formatPrice from '@utils/formatPrice'
import formatPlusMinus from '@utils/formatPlusMinus'
import ChartData from './ChartData'
import largeCurrencyFormatter from '@utils/largeCurrencyFormatter'
import ExpandedChart from './ExpandedChart'

export default function ExpandedCard({
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
  dataInterval,
  setDataInterval,
}) {
  return (
    <div>
      <div className={styles.cardInner}>
        <button className={styles.close} onClick={() => setIsExpanded(false)}>
          Close
        </button>
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
        <ExpandedChart
          isExpanded={isExpanded}
          cryptoName={id}
          data={data}
          isLoading={isLoading}
          dataInterval={dataInterval}
          setDataInterval={setDataInterval}
        />
      </div>
    </div>
  )
}
