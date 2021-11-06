import { useQuery } from 'react-query'

const useGetPortfolioData = (cryptoId, options) => {
  return useQuery(
    `${cryptoId}-portfolio-item`,
    async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${cryptoId}`
      )
      const jsonData = await response.json()
      return await jsonData.data
    },
    options
  )
}

export default useGetPortfolioData
