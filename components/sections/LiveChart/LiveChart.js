import { Line } from 'react-chartjs-2'

export default function LiveChart({ price, data }) {
  const opts = {
    tooltips: {
      intersect: false,
      mode: 'index',
    },
    responsive: true,
    maintainAspectRatio: false,
  }
  if (price === '0.00') {
    return <h2>please select a currency pair</h2>
  }

  return <Line data={data} options={opts} />
}
