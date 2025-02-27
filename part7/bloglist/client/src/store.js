import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './reducers/loginReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    login: loginReducer,
    blogs: blogReducer,
    users: userReducer,
    notifications: notificationReducer
  }
})

export default store
