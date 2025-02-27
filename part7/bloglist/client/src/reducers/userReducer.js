import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

export const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    append(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      return (state = state.map(x => (x.id === action.payload.id ? action.payload : x)))
    },
    remove(state, action) {
      return (state = state.filter(x => x.id !== action.payload.id))
    }
  }
})

export const { set, append, update, remove } = userSlice.actions

export const initializeUsers = () => async dispatch => {
  const users = await userService.getAll()
  dispatch(set(users))
  return users
}

export const createUser = user => async dispatch => {
  const newUser = await userService.create(user)
  dispatch(append(newUser))
  return newUser
}

export default userSlice.reducer
