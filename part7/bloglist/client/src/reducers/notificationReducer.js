import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

export const initialState = []

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload)
    },
    remove(state, action) {
      return state.filter(x => x.id !== action.payload.id)
    }
  }
})

export const { add, remove } = notificationSlice.actions

export const showSuccess =
  (content, timeoutInSeconds = 5) =>
  async dispatch => {
    const notification = {
      id: getId(),
      type: 'success',
      content: content,
      timeout: timeoutInSeconds * 1000
    }
    await dispatch(add(notification))
    setTimeout(() => {
      dispatch(remove(notification))
    }, notification.timeout)
  }

export const showError =
  (content, timeoutInSeconds = 5) =>
  async dispatch => {
    const notification = {
      id: getId(),
      type: 'error',
      content: content,
      timeout: timeoutInSeconds * 1000
    }
    await dispatch(add(notification))
    setTimeout(() => {
      dispatch(remove(notification))
    }, notification.timeout)
  }

export default notificationSlice.reducer
