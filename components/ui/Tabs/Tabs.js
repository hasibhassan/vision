import styles from './Tabs.module.css'
import cx from 'classnames'
import { useAppContext } from '@utils/Context/AppContext'
import { Auth, API } from 'aws-amplify'
import { useRouter } from 'next/router'
import Saved from '@sections/Profile/Saved'
import Portfolio from '@sections/Profile/Portfolio'
import Button from '@ui/Buttons/Button'
import DeleteButton from '@ui/Buttons/DeleteButton'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { useAuthContext } from '@utils/Context/AuthContext'

const tabs = [
  { name: 'Saved News' },
  { name: 'Portfolio' },
  { name: 'Settings' },
]

export default function Tabs({ userData }) {
  const { state, dispatch } = useAppContext()
  const { currentTab } = state
  const Router = useRouter()
  const { isAuth, setIsAuth } = useAuthContext()

  async function signOut() {
    try {
      toast('Signing Out...', { type: 'info' })
      await Auth.signOut()
      dispatch({ type: 'flush_state' })
      toast('Signed Out! Returning to Home Page', { type: 'success' })
      setIsAuth(false)
      Router.replace('/')
    } catch (err) {
      console.log({ err })
    }
  }

  async function deleteUser() {
    toast('Deleting User...', { type: 'warning' })
    const user = await Auth.currentAuthenticatedUser()
    user.deleteUser((error, data) => {
      if (error) {
        throw error
      }
      // do stuff after deletion
    })

    await API.put('visionapi', `/delete/${userData.user}`)
    await signOut()
  }

  return (
    <div>
      <div className={styles.selectContainer}>
        <label htmlFor="tabs" className={styles.srOnly}>
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className={styles.select}
          defaultValue={tabs.find((tab) => tab.name === currentTab).name}
          onChange={(e) =>
            dispatch({ type: 'switch_tab', value: e.target.value })
          }
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className={styles.tabsContainer}>
        <div className={styles.navContainer}>
          <nav className={styles.nav} aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                onClick={() =>
                  dispatch({ type: 'switch_tab', value: tab.name })
                }
                className={cx(
                  styles.defaultTabs,
                  {
                    [styles.current]: currentTab === tab.name,
                  },
                  {
                    [styles.notCurrent]: currentTab !== tab.name,
                  }
                )}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {currentTab === 'Saved News' && <Saved />}
      {currentTab === 'Portfolio' && <Portfolio />}
      {currentTab === 'Settings' && (
        <div className={styles.settingsContainer}>
          <p className={styles.settingsInfo}>
            Account email is: {userData.user}
          </p>
          <p className={styles.settingsInfo}>
            Account created on {format(new Date(userData.createdAt), 'PPPPpp')}
          </p>
          <p className={styles.settingsInfo}>Data provided by:</p>
          <a
            href="https://www.coingecko.com/en/api"
            className={styles.settingsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            CoinGecko API
          </a>
          <a
            href="https://blockchair.com/api"
            className={styles.settingsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Blockchair API
          </a>
          <div className={styles.signOutButton}>
            <Button onClick={() => signOut()} label={'Sign Out'} />
          </div>
          <DeleteButton onClick={() => deleteUser()} label={'Delete User'} />
        </div>
      )}
    </div>
  )
}
