import { useQuery } from 'react-query'

const useGetCardData = (options, number = 25) => {
  return useQuery(
    `cryptoCards`,
    async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${number}&page=1&sparkline=false`
      )
      return await response.json()
    },
    options
  )
}

export default useGetCardData
