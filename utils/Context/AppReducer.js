export const initialState = {
  // TODO #16 fix reducer and context
  number: 0,
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
  }
}
