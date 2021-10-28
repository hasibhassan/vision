import styles from './ForgotPasswordInput.module.css'
import { FiMail } from 'react-icons/fi'

export default function ForgotPasswordInput() {
  return (
    <div>
      <label htmlFor="email" className={styles.forgotPasswordLabel}>
        Email
      </label>
      <div className={styles.inputContainer}>
        <div className={styles.mailIconContainer}>
          <FiMail className={styles.mailIcon} aria-hidden="true" />
        </div>
        <input
          type="email"
          name="email"
          id="email"
          className={styles.input}
          placeholder="Enter your email"
        />
      </div>
    </div>
  )
}
