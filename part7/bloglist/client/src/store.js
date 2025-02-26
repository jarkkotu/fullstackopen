import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
// import anecdoteFilterReducer from './reducers/anecdoteFilterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    // filter: anecdoteFilterReducer,
    notifications: notificationReducer
  }
})

export default store
