import React, { useState } from 'react'
import styles from './ConfirmPasswordReset.module.css'
import Auth from '@aws-amplify/auth'
import { useRouter } from 'next/router'

export default function ConfirmPasswordReset() {
  const [formState, setFormState] = useState({
    email: '',
    code: '',
    newPassword: '',
  })
  const Router = useRouter()
  const { email, code, newPassword } = formState

  function onChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  async function passwordReset(e) {
    e.preventDefault()
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword)
      Router.replace('/profile')
    } catch (err) {
      console.log({ err })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div>
          <img className={styles.logo} src="logo.svg" alt="Vision" />
          <h2 className={styles.heading}>Confirm Password Reset</h2>
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
                placeholder="Email"
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="password" className={styles.srOnly}>
                Confirmation Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                required
                className={styles.code}
                placeholder="Confirmation Code"
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className={styles.srOnly}>
                New Password
              </label>
              <input
                id="email-address"
                name="newPassword"
                type="password"
                required
                className={styles.password}
                placeholder="New Password"
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <button className={styles.submitButton} onClick={passwordReset}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
