import styles from './ExpandedCard.module.css'
import formatPrice from '@utils/formatPrice'
import formatPlusMinus from '@utils/formatPlusMinus'
import largeCurrencyFormatter from '@utils/largeCurrencyFormatter'
import ExpandedChart from './ExpandedChart'
import Head from 'next/head'

export default function ExpandedCard({
  setIsExpanded,
  name,
  symbol,
  currentPrice,
  priceChangePercentageDaily,
  volume,
  id,
  marketCap,
  image,
  data,
  isLoading,
  dataInterval,
  setDataInterval,
}) {
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
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
          cryptoName={id}
          dataInterval={dataInterval}
          setDataInterval={setDataInterval}
          isLoading={isLoading}
          data={data}
        />
      </div>
    </div>
  )
}
