import styles from './Card.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper'

import 'swiper/css'
import 'swiper/css/effect-cards'

export default function NewsCards({ dataArray }) {
  return (
    <Swiper modules={[EffectCards]} effect="cards" className={styles.swiper}>
      {dataArray.map((el) => (
        <SwiperSlide className={styles.swiperSlide}>
          <p>{el.title}</p>

          <a href={el.link}>Link</a>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
