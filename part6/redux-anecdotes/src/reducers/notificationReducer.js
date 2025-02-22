import { createSlice } from '@reduxjs/toolkit'

export const getId = () => (100000 * Math.random()).toFixed(0)

export const initialState = []

export const defaultTimeout = 5000

const create = (type, content) => {
  return {
    id: getId(),
    type: type,
    content: content,
    timeout: defaultTimeout
  }
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    error(state, action) {
      state.push(create('ERROR', action.payload))
    },
    success(state, action) {
      state.push(create('SUCCESS', action.payload))
    },
    remove(state, action) {
      return state.filter(x => x.id !== action.payload)
    }
  }
})

export const { error, success, remove } = notificationSlice.actions
export default notificationSlice.reducer