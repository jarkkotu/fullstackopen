export const initialState = ''

const anecdoteFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload.text
    default:
      return state
  }
}

export const filter = (text) => {
  return {
    type: "FILTER",
    payload: {
      text: text
    }
  }
}

export default anecdoteFilterReducer