export const initialState = {
  currentTab: 'Saved',
  likedNews: [],
  portfolio: [],
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

    case 'like_coin': {
      return { ...state, portfolio: [...state.portfolio, action.value] }
    }

    case 'unlike_coin': {
      return {
        ...state,
        portfolio: state.portfolio.filter((e) => e !== action.value),
      }
    }
  }
}
