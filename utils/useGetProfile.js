import { useQuery } from 'react-query'
import { API } from 'aws-amplify'

const useGetProfile = (email, options) => {
  return useQuery(
    'user',
    async () => {
      const response = await API.get('visionapi', `/users/${email}`, {})
      console.log(response)
      return await response.body
    },
    options
  )
}

export default useGetProfile
