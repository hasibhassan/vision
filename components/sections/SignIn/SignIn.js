import React, { useState, useEffect } from 'react'
import styles from './SignIn.module.css'
import Link from 'next/link'
import Head from 'next/head'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useAuthContext } from '@utils/Context/AuthContext'

export default function SignIn() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })
  const [isChecked, setIsChecked] = useState(false)
  const Router = useRouter()
  const { email, password } = formState
  const { isAuth, setIsAuth } = useAuthContext()

  function onChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      await Auth.currentAuthenticatedUser()

      Router.replace('/profile')
    } catch (err) {
      console.log({ err })
    }
  }

  async function signIn(e) {
    e.preventDefault()
    try {
      toast('Signing In...', { type: 'info' })
      await Auth.signIn(email, password)
      if (isChecked) {
        Auth.rememberDevice()
      }
      console.log('signed in')
      toast('Signed In!', { type: 'success' })
      setIsAuth(true)
      Router.replace('/profile')
    } catch (e) {
      console.log({ e })
      switch (e.code) {
        case 'Username should be either an email or a phone number.':
          toast('Username should be an email', { type: 'error' })
          break
        case 'InvalidPasswordException':
          toast(`${e.message}`, { type: 'error' })
          break
        case 'UserNotFoundException':
          toast(`${e.message}`, { type: 'error' })
          break
        case 'User is not confirmed.':
          toast(`${e.message}`, { type: 'error' })
          break
        case 'Incorrect username or password.':
          toast(`${e.message}`, { type: 'error' })
          break
        case 'User does not exist.':
          toast(`${e.message}`, { type: 'error' })
          break
        default:
          toast(`Email or password error. Try again.`, { type: 'error' })
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>
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
        <form className={styles.form}>
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
                onChange={onChange}
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
                onChange={onChange}
              />
            </div>
          </div>
          <div className={styles.aboveSubmitContainer}>
            <div className={styles.rememberMeContainer}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                onChange={() => setIsChecked(!isChecked)}
                className={styles.rememberMe}
              />
              <label htmlFor="remember-me" className={styles.rememberMeLabel}>
                Remember Me
              </label>
            </div>
            <div className={styles.forgotPasswordContainer}>
              <a href="/resetpassword" className={styles.forgotPasswordLink}>
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button className={styles.submitButton} onClick={signIn}>
              Sign In
            </button>
          </div>
          <div>
            <button
              type="button"
              className={styles.googleButton}
              onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
            >
              <p>Sign In With Google</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
