import heart from 'react-useanimations/lib/heart'
import UseAnimations from 'react-useanimations'
import { useAppContext } from '@utils/Context/AppContext'

export default function LikeButton({ size = 24, color = 'red', newsHash }) {
  const { state, dispatch } = useAppContext()
  const { likedNews } = state
  const isLiked = likedNews.includes(newsHash)

  const setIsLiked = (hash) => {
    if (likedNews.includes(hash)) {
      dispatch({ type: 'unlike_news', value: hash })
    } else {
      dispatch({ type: 'like_news', value: hash })
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
