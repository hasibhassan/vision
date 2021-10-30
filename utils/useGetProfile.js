import { useQuery } from 'react-query'
import { API } from 'aws-amplify'

const useGetProfile = (email, options) => {
  return useQuery(
    'user',
    async () => {
      const response = await API.get('visionapi', `/users/${email}`, {})
      return response.Item
    },
    options
  )
}

export default useGetProfile
