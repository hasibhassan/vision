import styles from './CoinCard.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-cards'
import PortfolioLikeButton from '@ui/Buttons/PortfolioLikeButton'
import Spinner from '@ui/Spinner/Spinner'
import formatPrice from '@utils/formatPrice'
import formatPlusMinus from '@utils/formatPlusMinus'
import largeCurrencyFormatter from '@utils/largeCurrencyFormatter'
import useGetCardData from '@utils/useGetCardData'
import InnerCoinChart from '@sections/Home/CoinCards/InnerCoinChart'

export default function CoinCard() {
  const { data, isLoading } = useGetCardData({
    refetchInterval: 60000,
    staleTime: 60000,
  })

  if (isLoading) return <Spinner />

  return (
    <Swiper modules={[EffectCards]} effect="cards" className={styles.swiper}>
      {data?.map((crypto, idx) => (
        <SwiperSlide key={idx} className={styles.swiperSlide}>
          <div>
            <div className={styles.cardInner}>
              <div className={styles.topData}>
                <img
                  src={crypto.image}
                  alt={`${crypto.name}`}
                  className={styles.cardImg}
                />
                <div className={styles.cryptoNameWrap}>
                  <h1 className={styles.cryptoName}>{crypto.name}</h1>
                  <p className={styles.cryptoSymbol}>{crypto.symbol}</p>
                  <div className={styles.likeContainer}>
                    <PortfolioLikeButton size={42} coinId={crypto.id} />
                  </div>
                </div>
                <h4 className={styles.cryptoPrice}>
                  {formatPrice(crypto.current_price)}
                  {formatPlusMinus(crypto.price_change_percentage_24h)}
                </h4>
                <p className={styles.cryptoMarketcap}>
                  Market Cap: ${largeCurrencyFormatter(crypto.market_cap)}
                </p>
                <p className={styles.cryptoVolume}>
                  Volume: ${largeCurrencyFormatter(crypto.total_volume)}
                </p>
              </div>
              <InnerCoinChart id={crypto.id} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
