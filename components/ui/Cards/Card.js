import styles from './Card.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper'

import 'swiper/css'
import 'swiper/css/effect-cards'

export default function Card() {
  const arr = [
    'hello world',
    'hello 2',
    'hello three',
    'hello 4',
    'hello five',
    'hello 6',
    'hello seven',
  ]
  return (
    <Swiper modules={[EffectCards]} effect="cards" className={styles.swiper}>
      {arr.map((el) => (
        <SwiperSlide className={styles.swiperSlide}>
          <p>{el}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
