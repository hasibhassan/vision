import '../styles/reset.css'
import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import Layout from '@sections/Containers/Layout'
import { AppContextWrapper } from '@utils/Context/AppContext'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

Amplify.configure({ ...config })

function MyApp({ Component, pageProps }) {
  return (
    <>
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
        </Layout>
      </AppContextWrapper>
    </>
  )
}

export default MyApp
