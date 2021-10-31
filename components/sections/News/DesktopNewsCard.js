import styles from './DesktopNewsCard.module.css'
import { format } from 'date-fns'
import { toast } from 'react-toastify'

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
        <div className={styles.time}>
          <p>Posted: {format(new Date(time).getTime(), 'p')}</p>
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
