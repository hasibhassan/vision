import React, { useState } from 'react'
import styles from './ForgotPassword.module.css'
import Auth from '@aws-amplify/auth'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Head from 'next/head'

export default function ForgotPassword() {
  const [formState, setFormState] = useState('')
  const Router = useRouter()

  function onChange(e) {
    setFormState(e.target.value)
  }

  async function sendPasswordReset(e) {
    e.preventDefault()

    if (!formState) {
      toast('Please enter an email', { type: 'error' })
    } else {
      try {
        await Auth.forgotPassword(formState)
        toast('Check email for confirmation code', { type: 'info' })
        Router.replace('/confirmpasswordreset')
      } catch (err) {
        console.log({ err })
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Vision</title>
      </Head>
      <div className={styles.formContainer}>
        <div>
          <img className={styles.logo} src="logo.svg" alt="Vision" />
          <h2 className={styles.heading}>Forgot Password</h2>
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
          </div>
          <div>
            <button className={styles.submitButton} onClick={sendPasswordReset}>
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
