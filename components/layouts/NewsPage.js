import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import NewsCards from '@ui/Cards/NewsCards'

export default function NewsPage() {
  const [dataArray, setDataArray] = useState([])
  const url = 'https://api.blockchair.com/news?q=language(en)'

  const isMobile = useMediaQuery({
    maxWidth: 1024,
  })
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  })

  useEffect(() => {
    const fetchNewsArticles = async () => {
      await fetch(url)
        .then((res) => res.json())
        .then((jsonData) => {
          setDataArray(Object.values(jsonData.data))
        })
    }

    fetchNewsArticles()
  }, [])

  return (
    <div>
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
