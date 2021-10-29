import { useQuery } from 'react-query'
import { API } from 'aws-amplify'

const useGetProfile = (options) => {
  return useQuery(
    'user',
    async () => {
      const response = await API.get('visionapi', '/users/', {})
      return await JSON.parse(response.body)
    },
    options
  )
}

export default useGetProfile
