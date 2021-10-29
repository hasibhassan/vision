import { useQuery } from 'react-query'
import API from 'aws-amplify'

const useGetProfile = (options) => {
  return useQuery(
    'user',
    async () => {
      try {
        const response = await API.get('visionapi', '/users/', {})
        return await JSON.parse(response.body)
      } catch (err) {
        console.log(err)
      }
    },
    options
  )
}

export default useGetProfile
