import { useQuery } from 'react-query'

const useGetPortfolioData = (url, options) => {
  return useQuery(
    'portfolio-items',
    async () => {
      const response = await fetch(url)
      return await response.json()
    },
    options
  )
}

export default useGetPortfolioData
