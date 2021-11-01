import heart from 'react-useanimations/lib/heart'
import UseAnimations from 'react-useanimations'

export default function LikeButton({
  liked,
  setIsLiked,
  btnSize = 24,
  color = 'red',
}) {
  return (
    <UseAnimations
      animation={heart}
      size={btnSize}
      onClick={() => setIsLiked(!liked)}
      reverse={liked}
      strokeColor={color}
      pathCss={`fill:${color}`}
    />
  )
}
