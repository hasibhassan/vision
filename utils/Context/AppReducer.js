export const initialState = {
  // TODO #16 fix reducer and context
  email: '',
}

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'init_stored': {
      return action.value
    }

    case 'add_number': {
      return {
        ...state,
        number: action.value + state.number,
      }
    }

    case 'update_user_email': {
      return {
        ...state,
        email: action.value,
      }
    }
  }
}
