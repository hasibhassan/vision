export const initialState = {
  // TODO #16 fix reducer and context
  email: '',
  currentTab: 'Saved',
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
  }
}
