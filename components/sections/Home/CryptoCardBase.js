import React, { useState } from 'react'
import ExpandedCard from './ExpandedCard'
import InnerCard from './InnerCard'
import Modal from 'react-modal'
import styles from './ExpandedCard.module.css'
import useGetChartData from '@utils/useGetChartData'

Modal.setAppElement('#__next')

export default function CryptoCardBase({
  symbol,
  name,
  image,
  currentPrice,
  marketCap,
  volume,
  priceChangePercentageDaily,
  id,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [dataInterval, setDataInterval] = useState(1)

  const { data, isLoading } = useGetChartData(id, dataInterval, {
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
    select: (data) =>
      data?.prices?.map((item) => ({
        x: item[0],
        y: item[1],
      })),
  })

  const toggleModal = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div>
      <InnerCard
        setIsExpanded={setIsExpanded}
        symbol={symbol}
        name={name}
        image={image}
        currentPrice={currentPrice}
        marketCap={marketCap}
        volume={volume}
        priceChangePercentageDaily={priceChangePercentageDaily}
        id={id}
        isExpanded={isExpanded}
        data={data}
        isLoading={isLoading}
      />
      <Modal
        isOpen={isExpanded}
        overlayClassName={styles.myoverlay}
        className={styles.mymodal}
      >
        <ExpandedCard
          setIsExpanded={setIsExpanded}
          symbol={symbol}
          name={name}
          image={image}
          currentPrice={currentPrice}
          marketCap={marketCap}
          volume={volume}
          priceChangePercentageDaily={priceChangePercentageDaily}
          id={id}
          isExpanded={isExpanded}
          dataInterval={dataInterval}
          setDataInterval={setDataInterval}
          data={data}
        />
      </Modal>
    </div>
  )
}
