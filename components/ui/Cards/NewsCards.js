import styles from './NewsCards.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper'
import format from 'date-fns/format'
import 'swiper/css'
import 'swiper/css/effect-cards'

export default function NewsCards({ dataArray }) {
  return (
    <Swiper modules={[EffectCards]} effect="cards" className={styles.swiper}>
      {dataArray.map((el) => (
        <SwiperSlide key={el.hash} className={styles.swiperSlide}>
          <p>{el.title}</p>
          <div className={styles.descriptionBox}>
            <p className={styles.description}>{el.description}</p>
          </div>
          <p className={styles.time}>
            Posted: {format(new Date(parseInt(el.time, 10)).getTime(), 'p')}
          </p>
          <a href={el.link}>Read at {el.source}</a>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
