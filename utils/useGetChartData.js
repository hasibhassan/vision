import { useQuery } from 'react-query'

const useGetChartData = (cryptoName, interval, options) => {
  return useQuery(
    [`${cryptoName}-chartData`, interval],
    async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart?vs_currency=usd&days=${interval}`
      )
      return await response.json()
    },
    options
  )
}

export default useGetChartData
