import styles from './Hero.module.css'
import HeroButton from '../../ui/Buttons/HeroButton'

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.containerTwo}>
        <h1 className={styles.heading}>
          See new <p className={styles.gradientText}>NFTs</p> as they drop, all
          in one centralized place.
        </h1>
        <p className={styles.description}>
          Vision lets users discover their new favorite NFT by showing listings
          from multiple marketplaces in one single place.
        </p>
        <div className={styles.CTAButtonStack}>
          <HeroButton label="Get Started" />
        </div>
      </div>
      <div className={styles.screenshotContainer}>
        <img
          className={styles.screenshot}
          src="https://kutty.netlify.app/hero.jpg"
          alt="Vision app screenshot"
        />
      </div>
    </div>
  )
}
