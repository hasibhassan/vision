import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'

export default function HomePage() {
  const notify = () => toast('toast test', { type: 'info' })

  const isMobile = useMediaQuery({
    maxWidth: 1024,
  })
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  })
  return (
    <div>
      {isMobile && (
        <div>
          <p>Mobile content here</p>
          <button onClick={notify}>Toast</button>
        </div>
      )}
      {isDesktop && (
        <div>
          <p>Desktop content here</p>
          <button onClick={notify}>Toast</button>
        </div>
      )}
    </div>
  )
}
