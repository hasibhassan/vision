import '../styles/reset.css'
import config from '../src/aws-exports'
import Layout from '@sections/Containers/Layout'
import { AppContextWrapper } from '@utils/Context/AppContext'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthContext } from '@utils/Context/AuthContext'
import Amplify, { Auth } from 'aws-amplify'
import React, { useState, useEffect } from 'react'

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//   require('../mocks')
// }

Amplify.configure({ ...config })
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState()

  useEffect(() => {
    const checkIsAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser()
        setIsAuth(true)
      } catch (err) {
        setIsAuth(false)
      }
    }

    checkIsAuth()
  }, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
          <AppContextWrapper>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable={true}
                pauseOnHover
                transition={Zoom}
              />
              <ReactQueryDevtools position={'bottom-right'} />
            </Layout>
          </AppContextWrapper>
        </AuthContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
