import styles from './SignIn.module.css'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div>
          <img className={styles.logo} src="logo.svg" alt="Vision" />
          <h2 className={styles.heading}>Sign in to your account</h2>
          <p className={styles.signUpLinkText}>
            <Link href="/signup">
              <a>Need an account?</a>
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
          <div className={styles.aboveSubmitContainer}>
            <div className={styles.rememberMeContainer}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={styles.rememberMe}
              />
              <label htmlFor="remember-me" className={styles.rememberMeLabel}>
                Remember Me
              </label>
            </div>
            <div className={styles.forgotPasswordContainer}>
              <a href="#" className={styles.forgotPasswordLink}>
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button type="submit" className={styles.submitButton}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
