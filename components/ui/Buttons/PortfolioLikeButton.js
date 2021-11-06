import heart from 'react-useanimations/lib/heart'
import UseAnimations from 'react-useanimations'
import { useAppContext } from '@utils/Context/AppContext'
import { Auth } from 'aws-amplify'
import { toast } from 'react-toastify'

export default function PortfolioLikeButton({
  size = 24,
  color = 'red',
  cryptoId,
}) {
  const { state, dispatch } = useAppContext()
  const { portfolio } = state
  const isLiked = portfolio.includes(cryptoId)

  const checkIsAuth = async () => {
    try {
      await Auth.currentAuthenticatedUser()
      return true
    } catch (err) {
      return false
    }
  }

  const setIsLiked = async (hash) => {
    const isAuth = await checkIsAuth()

    if (isAuth) {
      if (portfolio.includes(hash)) {
        dispatch({ type: 'unlike_coin', value: hash })
      } else {
        dispatch({ type: 'like_coin', value: hash })
      }
    } else {
      toast('You must be logged in to do that', { type: 'error' })
    }
  }

  return (
    <UseAnimations
      animation={heart}
      size={size}
      onClick={() => setIsLiked(cryptoId)}
      reverse={isLiked}
      strokeColor={color}
      pathCss={`fill:${color}`}
    />
  )
}
