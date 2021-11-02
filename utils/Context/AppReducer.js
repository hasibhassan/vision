export const initialState = {
  // TODO #16 fix reducer and context
  email: '',
  currentTab: 'Saved',
  likedNews: [],
}

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'init_stored': {
      return action.value
    }

    case 'update_user_email': {
      return {
        ...state,
        email: action.value,
      }
    }

    case 'switch_tab': {
      return {
        ...state,
        currentTab: action.value,
      }
    }

    case 'like_news': {
      return { ...state, likedNews: [...state.likedNews, action.value] }
    }

    case 'unlike_news': {
      return {
        ...state,
        likedNews: state.likedNews.filter((e) => e !== action.value),
      }
    }
  }
}
