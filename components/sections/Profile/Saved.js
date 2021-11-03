import { useAppContext } from '@utils/Context/AppContext'
import styles from './Saved.module.css'
import { FaRegThumbsUp } from 'react-icons/fa'

export default function Saved() {
  const { state } = useAppContext()
  const { likedNews } = state
  return (
    <div className={styles.outsideContainer}>
      <div className={styles.rootContainer}>
        <ul role="list" className={styles.ul}>
          {likedNews.map((newsLink, idx) => (
            <li key={idx}>
              <div className={styles.listItemContainer}>
                <div className={styles.listItem}>
                  <div>
                    <FaRegThumbsUp className={styles.likeIcon} />
                  </div>
                  <div className={styles.linkContainer}>
                    <div>
                      <a
                        href={newsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className={styles.link}>{newsLink}</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
