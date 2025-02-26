import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notifications from './components/Notifications'
import Login from './components/Login'
import Blogs from './components/Blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { showSuccess, showError } from './reducers/notificationReducer'
import { initializeUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const initializeAsync = async () => {
      try {
        await dispatch(initializeBlogs())
      } catch (error) {
        dispatch(showError(`Failed to initialize: ${error.response.data.error}`))
      }
    }

    initializeAsync()
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  return (
    <div>
      <Notifications />
      {user === null ? <Login /> : <Blogs />}
    </div>
  )
}

export default App
