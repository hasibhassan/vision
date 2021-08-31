import styles from './Button.module.css'
import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function Button({ label }) {
  return (
    <div>
      <Link href="/signup">
        <a className={styles.lgBtn}>
          {label}
          <ArrowRightIcon className={styles.rightLgBtnIcon} />
        </a>
      </Link>
    </div>
  )
}
