import React, { useState, useEffect } from 'react'
import styles from './SignUp.module.css'
import Link from 'next/link'
import Auth from '@aws-amplify/auth'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Head from 'next/head'

export default function SignUp() {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const Router = useRouter()
  const { email, password } = formState

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

  async function signUp(e) {
    e.preventDefault()
    try {
      console.log(formState)
      await Auth.signUp({
        username: email,
        password: password,
        attributes: { email },
      })
      toast('Account created! Logging in...', { type: 'success' })
      await Auth.signIn(email, password)

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
        <title>Create Account</title>
      </Head>
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
          <div>
            <button className={styles.submitButton} onClick={signUp}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
