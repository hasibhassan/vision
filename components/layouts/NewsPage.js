import useGetNewsStories from '@utils/useGetNewsStories'
import { useMediaQuery } from 'react-responsive'
import Spinner from '@ui/Spinner/Spinner'
import NewsCards from '@ui/Cards/NewsCards'
import Head from 'next/head'
import styles from '@sections/News/DesktopNewsGrid.module.css'
import DesktopNewsCard from '@sections/News/DesktopNewsCard'

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
    return (
      <div>
        <Head>
          <title>News</title>
        </Head>
        <NewsCards dataArray={data} />
      </div>
    )
  } else {
    return (
      <div className={styles.desktopNewsCardGrid}>
        <Head>
          <title>News</title>
        </Head>
        {data?.map((newsStory) => (
          <DesktopNewsCard
            title={newsStory.title}
            time={newsStory.time}
            description={newsStory.description}
            link={newsStory.link}
            source={newsStory.source}
          />
        ))}
      </div>
    )
  }
}
