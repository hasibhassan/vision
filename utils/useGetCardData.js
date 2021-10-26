import { useQuery } from 'react-query'

const useGetCardData = (cryptoName, options) => {
  return useQuery(
    `${cryptoName}-card`,
    async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoName}`
      )
      return await response.json()
    },
    options
  )
}

export default useGetCardData
