import { Fragment, useState } from 'react'
import styles from './Layout.module.css'
import { Dialog, Transition } from '@headlessui/react'
import { BiHome, BiUserCircle, BiMenu, BiBookmarks } from 'react-icons/bi'
import { AiOutlineClose, AiOutlineFire } from 'react-icons/ai'
import { RiLiveLine } from 'react-icons/ri'

const navigation = [
  { name: 'Home', href: '/', icon: BiHome },
  { name: 'Trending', href: '/news', icon: AiOutlineFire },
  { name: 'Saved', href: '/profile', icon: BiBookmarks },
  { name: 'Live Price Chart', href: '/live', icon: RiLiveLine },
]

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className={styles.rootContainer}>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className={styles.dialog} onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter={styles.eRoot}
            enterFrom={styles.efRoot}
            enterTo={styles.etRoot}
            leave={styles.eRoot}
            leaveFrom={styles.etRoot}
            leaveTo={styles.efRoot}
          >
            <Dialog.Overlay className={styles.dialogOverlay} />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter={styles.eOuter}
            enterFrom={styles.efOuter}
            enterTo={styles.etOuter}
            leave={styles.eOuter}
            leaveFrom={styles.etOuter}
            leaveTo={styles.efOuter}
          >
            <div className={styles.transitionInner}>
              <Transition.Child
                as={Fragment}
                enter={styles.eInner}
                enterFrom={styles.efInner}
                enterTo={styles.etInner}
                leave={styles.eInner}
                leaveFrom={styles.etInner}
                leaveTo={styles.efInner}
              >
                <div className={styles.closeSidebarContainer}>
                  <button
                    type="button"
                    className={styles.closeButton}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={styles.srOnly}>Close sidebar</span>
                    <AiOutlineClose
                      className={styles.closeIcon}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className={styles.sidebarNavContainer}>
                <div className={styles.logoContainer}>
                  <img className={styles.logo} src="logo.svg" alt="Vision" />
                </div>
                <nav aria-label="Sidebar" className={styles.navContainer}>
                  <div className={styles.navLinks}>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={styles.navLink}
                      >
                        <item.icon
                          className={styles.navLinkIcon}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
              <div className={styles.mobileProfileContainer}>
                <a key={'Profile'} href={'/profile'} className={styles.navLink}>
                  <BiUserCircle
                    className={styles.navLinkIcon}
                    aria-hidden="true"
                  />
                  Profile
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className={styles.sidebarShrinkMenuButton} aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div className={styles.desktopSidebarContainer}>
        <div className={styles.desktopSidebarContainerTwo}>
          <div className={styles.desktopSidebarContainerThree}>
            <div className={styles.desktopItemsContainer}>
              <div className={styles.desktopLogoContainer}>
                <img
                  className={styles.desktopLogo}
                  src="logoWhite.svg"
                  alt="Vision"
                />
              </div>
              <nav className={styles.desktopNavContainer}>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={styles.desktopNavLink}
                  >
                    <item.icon
                      className={styles.desktopLogoImg}
                      aria-hidden="true"
                    />
                    <span className={styles.srOnly}>{item.name}</span>
                  </a>
                ))}
              </nav>
            </div>
            <div className={styles.desktopNavContainer}>
              <a
                key={'Profile'}
                href={'/profile'}
                className={styles.desktopNavLinkTwo}
              >
                <BiUserCircle
                  className={styles.desktopLogoImg}
                  aria-hidden="true"
                />
                <span className={styles.srOnly}>Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mobileTopContainer}>
        {/* Mobile top navigation */}
        <div className={styles.mobileTopContainerTwo}>
          <div className={styles.mobileTopBar}>
            <div>
              <img className={styles.logo} src="logoWhite.svg" alt="Vision" />
            </div>
            <div>
              <button
                type="button"
                className={styles.menuIconButton}
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className={styles.srOnly}>Open Sidebar</span>
                <BiMenu className={styles.desktopLogoImg} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <main className={styles.mainContainer}>
          <div className={styles.mainContainerTwo}>
            <section
              aria-labelledby="primary-heading"
              className={styles.mainSection}
            >
              <h1 id="primary-heading" className={styles.srOnly}></h1>
              {/* Main content */}
              {children}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
