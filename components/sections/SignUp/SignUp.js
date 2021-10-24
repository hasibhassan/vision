import styles from './SignUp.module.css'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div>
          <img className={styles.logo} src="logo.svg" alt="Vision" />
          <h2 className={styles.heading}>Create an account</h2>
          <p className={styles.signUpLinkText}>
            <Link href="/login">
              <a>Have an account?</a>
            </Link>
          </p>
        </div>
        <form className={styles.form} action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className={styles.inputGroup}>
            <div>
              <label htmlFor="email-address" className={styles.srOnly}>
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={styles.email}
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className={styles.srOnly}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={styles.password}
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
