import heart from 'react-useanimations/lib/heart'
import UseAnimations from 'react-useanimations'
import { useAppContext } from '@utils/Context/AppContext'
import { Auth } from 'aws-amplify'
import { toast } from 'react-toastify'

export default function LikeButton({ size = 24, color = 'red', newsHash }) {
  const { state, dispatch } = useAppContext()
  const { likedNews } = state
  const isLiked = likedNews.includes(newsHash)

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
      if (likedNews.includes(hash)) {
        dispatch({ type: 'unlike_news', value: hash })
      } else {
        dispatch({ type: 'like_news', value: hash })
      }
    } else {
      toast('You must be logged in to do that', { type: 'error' })
    }
  }

  return (
    <UseAnimations
      animation={heart}
      size={size}
      onClick={() => setIsLiked(newsHash)}
      reverse={isLiked}
      strokeColor={color}
      pathCss={`fill:${color}`}
    />
  )
}
