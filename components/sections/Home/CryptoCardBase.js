import React, { useState } from 'react'
import ExpandedCard from './ExpandedCard'
import InnerCard from './InnerCard'

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

  return (
    <div>
      {!isExpanded ? (
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
        />
      ) : (
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
        />
      )}
    </div>
  )
}
