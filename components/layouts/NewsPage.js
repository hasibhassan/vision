import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import NewsCards from '@ui/Cards/NewsCards'
import Spinner from '@ui/Spinner/Spinner'

export default function NewsPage() {
  const [dataArray, setDataArray] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const isMobile = useMediaQuery({
    maxWidth: 1024,
  })
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  })

  const url = 'https://api.blockchair.com/news?q=language(en)'

  useEffect(() => {
    const fetchNewsArticles = async () => {
      setIsLoading(true)
      await fetch(url)
        .then((res) => res.json())
        .then((jsonData) => {
          setDataArray(Object.values(jsonData.data))
        })
      setIsLoading(false)
    }

    fetchNewsArticles()
  }, [])

  return (
    <div>
      {isLoading && <Spinner />}
      {isMobile && <NewsCards dataArray={dataArray} />}
      {isDesktop &&
        dataArray.map((el) => (
          <ul>
            <li>{el.title}</li>
          </ul>
        ))}
    </div>
  )
}
