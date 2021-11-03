import styles from './NewsCards.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-cards'
import LikeButton from '@ui/Buttons/LikeButton'

export default function NewsCards({ dataArray }) {
  return (
    <Swiper modules={[EffectCards]} effect="cards" className={styles.swiper}>
      {dataArray.map((el) => (
        <SwiperSlide key={el.hash} className={styles.swiperSlide}>
          <p>{el.title}</p>
          <div className={styles.descriptionBox}>
            <p className={styles.description}>{el.description}</p>
          </div>
          <div className={styles.likeContainer}>
            <LikeButton size={40} newsHash={el.link} />
          </div>
          <p className={styles.time}>Posted: {el.time}</p>
          <a href={el.link} target="_blank" rel="noopener noreferrer">
            Read at {el.source}
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
