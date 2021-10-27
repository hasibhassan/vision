import { useQuery } from 'react-query'

const useGetNewsStories = (options) => {
  return useQuery(
    'newsStories',
    async () => {
      const response = await fetch(
        'https://api.blockchair.com/news?q=language(en)'
      )
      const jsonData = await response.json()
      return await jsonData.data
    },
    options
  )
}

export default useGetNewsStories
