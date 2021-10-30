import { useQuery } from 'react-query'
import { API } from 'aws-amplify'

const useGetProfile = (options) => {
  return useQuery(
    'user',
    async () => {
      const response = await API.get('visionapi', '/users/', {})
      console.log(response)
      return await response.body
    },
    options
  )
}

export default useGetProfile
