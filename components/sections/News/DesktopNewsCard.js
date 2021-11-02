import LikeButton from '@ui/Buttons/LikeButton'
import styles from './DesktopNewsCard.module.css'

export default function DesktopNewsCard({
  title,
  description,
  time,
  link,
  source,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.titleBox}>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.descriptionBox}>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.bottomBox}>
        <button>
          <LikeButton size={30} newsHash={link} />
        </button>
        <div className={styles.time}>
          <p>Posted: {time}</p>
        </div>
        <div className={styles.link}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            Read at {source}
          </a>
        </div>
      </div>
    </div>
  )
}
