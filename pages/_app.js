import '../styles/reset.css'
import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { QueryClient, QueryClientProvider } from 'react-query'

Amplify.configure({ ...config })

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
