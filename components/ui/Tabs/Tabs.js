import styles from './Tabs.module.css'
import cx from 'classnames'

const tabs = [
  { name: 'Saved', href: '#', current: false },
  { name: 'Portfolio', href: '#', current: false },
  { name: 'Notes', href: '#', current: true },
  { name: 'Settings', href: '#', current: false },
]

export default function Tabs() {
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
          defaultValue={tabs.find((tab) => tab.current).name}
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
                href={tab.href}
                className={cx(
                  styles.defaultTabs,
                  {
                    [styles.current]: tab.current,
                  },
                  { [styles.notCurrent]: !tab.current }
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
