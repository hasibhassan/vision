import styles from './Footer.module.css'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.stack}>
        <div className={styles.stackTwo}>
          <img src="logo.svg" alt="" className={styles.logo} />
          <Link href="https://github.com/hasibhassan/vision">
            <a>
              <FaGithub fontSize="20px" />
            </a>
          </Link>
        </div>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()}{' '}
          <Link href="https://hasibhassan.com">
            <a>Hasib Hassan</a>
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  )
}
