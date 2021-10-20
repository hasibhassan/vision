import '../styles/reset.css'
import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import Layout from '@sections/Containers/Layout'
import { AppContextWrapper } from '@utils/Context/AppContext'

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
        </Layout>
      </AppContextWrapper>
    </>
  )
}

export default MyApp
