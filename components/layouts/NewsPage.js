import useGetNewsStories from '@utils/useGetNewsStories'
import { useMediaQuery } from 'react-responsive'
import Spinner from '@ui/Spinner/Spinner'
import NewsCards from '@ui/Cards/NewsCards'

export default function NewsPage() {
  const { data, isLoading } = useGetNewsStories({
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
  })
  const isMobile = useMediaQuery({
    maxWidth: 1024,
  })

  if (isLoading) {
    return <Spinner />
  } else if (isMobile && !isLoading) {
    return <NewsCards dataArray={data} />
  } else {
    return (
      <div>
        <ul>
          {data?.map((el) => (
            <li key={el.hash}>{el?.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}
