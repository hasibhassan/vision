import styles from './Tabs.module.css'
import cx from 'classnames'
import { useAppContext } from '@utils/Context/AppContext'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import Saved from '@sections/Profile/Saved'
import Portfolio from '@sections/Profile/Portfolio'

const tabs = [{ name: 'Saved' }, { name: 'Portfolio' }, { name: 'Settings' }]

export default function Tabs({ userData }) {
  const { state, dispatch } = useAppContext()
  const { currentTab } = state
  const Router = useRouter()

  async function signOut() {
    try {
      await Auth.signOut()
      Router.replace('/')
    } catch (err) {
      console.log({ err })
    }
  }

  return (
    <div>
      <div className={styles.selectContainer}>
        <label htmlFor="tabs" className={styles.srOnly}>
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
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
      {currentTab === 'Saved' && <Saved userData={userData} />}
      {currentTab === 'Portfolio' && <Portfolio userData={userData} />}
      {currentTab === 'Notes' && <Notes userData={userData} />}
      {currentTab === 'Settings' && (
        <button onClick={() => signOut()}>Sign Out</button>
      )}
    </div>
  )
}
