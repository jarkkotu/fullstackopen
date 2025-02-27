import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

export const initialState = null

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    add(state, action) {
      return action.payload
    },
    remove(state, action) {
      return null
    }
  }
})

export const { add, remove } = loginSlice.actions

export const initializeLogin = () => async dispatch => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    dispatch(add(user))
    blogService.setToken(user.token)
  }
}

export const login = (username, password) => async dispatch => {
  const user = await loginService.login({ username, password })
  window.localStorage.setItem('loggedUser', JSON.stringify(user))
  dispatch(add(user))
  blogService.setToken(user.token)
  return user
}

export const logout = () => async dispatch => {
  window.localStorage.removeItem('loggedUser')
  blogService.setToken(null)
  dispatch(remove())
}

export default loginSlice.reducer
