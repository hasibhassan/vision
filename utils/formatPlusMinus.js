import styles from '../components/sections/Home/Home.module.css'

const formatPlusMinus = (priceChange) => {
  const isPositive = Math.sign(priceChange) >= 0

  return (
    <span className={isPositive ? styles.positive : styles.negative}>
      {`${isPositive ? '+' : ''}${priceChange.toFixed(2)}%`}
    </span>
  )
}

export default formatPlusMinus
