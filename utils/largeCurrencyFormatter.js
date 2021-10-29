const largeCurrencyFormatter = (num) => {
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(num)
}

export default largeCurrencyFormatter
