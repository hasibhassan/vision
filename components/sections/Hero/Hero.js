import styles from './Hero.module.css'
import HeroButton from '../../ui/Buttons/HeroButton'

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.containerTwo}>
        <h1 className={styles.heading}>
          See <p className={styles.gradientText}>blockchains</p> in a different
          way.
        </h1>
        <p className={styles.description}>
          Vision lets users see what's going on in blockchains.
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
