import React, { Fragment } from 'react'
import styles from './Navbar.module.css'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'

const navigation = [{ name: 'Sign Up', href: '/signup' }]

export default function Navbar() {
  return (
    <Popover>
      <div className={styles.navbarContainer}>
        <nav className={styles.navBar} aria-label="Global">
          <div className={styles.logoContainer}>
            <div className={styles.logoContainerTwo}>
              <Link href="/">
                <a>
                  <span className={styles.srOnly}>Vision</span>
                  <img src="logo.svg" alt="" className={styles.logo} />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <img src="logotext.svg" alt="" className={styles.logoText} />
                </a>
              </Link>
              <div className={styles.menuButtonContainer}>
                <Popover.Button className={styles.menuButton}>
                  <span className={styles.srOnly}>Open menu</span>
                  <MenuIcon className={styles.menuIcon} />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className={styles.navItems}>
            {navigation.map((item) => (
              <Link href={item.href}>
                <a key={item.name} className={styles.navLink}>
                  {item.name}
                </a>
              </Link>
            ))}
            <Link href="/login">
              <a className={styles.navLogin}>Log in</a>
            </Link>
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter={styles.enter}
        enterFrom={styles.enterFrom}
        enterTo={styles.enterTo}
        leave={styles.leave}
        leaveFrom={styles.leaveFrom}
        leaveTo={styles.leaveTo}
      >
        <Popover.Panel focus className={styles.popoverPanel}>
          <div className={styles.popoverContainer}>
            <div className={styles.popoverMenuContainer}>
              <div>
                <img src="logo.svg" alt="" className={styles.popoverLogo} />
              </div>
              <div className={styles.menuCloseButtonContainer}>
                <Popover.Button className={styles.menuCloseButton}>
                  <span className={styles.srOnly}>Close menu</span>
                  <XIcon className={styles.menuCloseIcon} aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className={styles.popoverMenuItems}>
              {navigation.map((item) => (
                <Link href={item.href}>
                  <a key={item.name} className={styles.popoverMenuLinks}>
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            <Link href="/login">
              <a className={styles.popoverMenuLogin}>Login</a>
            </Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
