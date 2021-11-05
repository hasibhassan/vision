import useGetPortfolioData from '@utils/useGetPortfolioData'
import formatPrice from '@utils/formatPrice'

export default function PortfolioListItem({ cryptoId }) {
  const { data, isLoading } = useGetPortfolioData(cryptoId, {
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <div>
      <span>{data.name}</span>{' '}
      <span>{`Price: ${formatPrice(data.priceUsd)}`}</span>
    </div>
  )
}
