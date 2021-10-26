import React, { useState, useEffect, useRef } from 'react'
import LiveChart from '@sections/LiveChart/LiveChart'
import { liveChartFormatter } from '@utils/liveChartFormatter'
import styles from '@sections/LiveChart/LiveChart.module.css'

export default function LiveChartPage() {
  const [currencies, setcurrencies] = useState([])
  const [pair, setpair] = useState('')
  const [price, setprice] = useState('0.00')
  const [pastData, setpastData] = useState({})
  const ws = useRef(null)

  let first = useRef(false)
  const url = 'https://api.pro.coinbase.com'

  useEffect(() => {
    ws.current = new WebSocket('wss://ws-feed.pro.coinbase.com')

    let pairs = []

    const fetchCurrencyPairs = async () => {
      await fetch(url + '/products')
        .then((res) => res.json())
        .then((data) => {
          pairs = data
        })

      let filtered = pairs.filter((pair) => {
        if (pair.quote_currency === 'USD') {
          return pair
        }
      })

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1
        }
        if (a.base_currency > b.base_currency) {
          return 1
        }
        return 0
      })

      setcurrencies(filtered)

      first.current = true
    }

    fetchCurrencyPairs()
  }, [])

  useEffect(() => {
    if (!first.current) {
      return
    }

    let msg = {
      type: 'subscribe',
      product_ids: [pair],
      channels: ['ticker'],
    }
    let jsonMsg = JSON.stringify(msg)
    ws.current.send(jsonMsg)

    const fetchChartData = async () => {
      let chartDataURL = `${url}/products/${pair}/candles?granularity=86400`
      let dataArr = []
      await fetch(chartDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data))

      let formattedData = liveChartFormatter(dataArr)
      setpastData(formattedData)
    }

    fetchChartData()

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data)
      if (data.type !== 'ticker') {
        return
      }

      if (data.product_id === pair) {
        setprice(data.price)
      }
    }
  }, [pair])

  const handleSelect = (e) => {
    let unsubMsg = {
      type: 'unsubscribe',
      product_ids: [pair],
      channels: ['ticker'],
    }
    let unsub = JSON.stringify(unsubMsg)

    ws.current.send(unsub)

    setpair(e.target.value)
  }
  return (
    <div className={styles.dashboard}>
      {
        <select name="currency" value={pair} onChange={handleSelect}>
          {currencies.map((cur, idx) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.base_currency}
              </option>
            )
          })}
        </select>
      }
      <LiveChart price={price} data={pastData} />
    </div>
  )
}
