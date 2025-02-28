import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { CssBaseline, Container } from '@mui/material'
import Notifications from './components/Notifications'
import Menu from './components/Menu'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Footer from './components/Footer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { showError } from './reducers/notificationReducer'
import { initializeLogin } from './reducers/loginReducer'

const App = () => {
  const login = useSelector(state => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    const initializeAsync = async () => {
      try {
        await dispatch(initializeBlogs())
      } catch (error) {
        dispatch(showError(`Failed to load blogs: ${error.response.data.error}`))
      }
    }

    initializeAsync()
  }, [])

  useEffect(() => {
    const initializeAsync = async () => {
      try {
        await dispatch(initializeUsers())
      } catch (error) {
        dispatch(showError(`Failed to load users: ${error.response.data.error}`))
      }
    }

    initializeAsync()
  }, [])

  useEffect(() => {
    dispatch(initializeLogin())
  }, [])

  return (
    <Container>
      <CssBaseline />
      <Menu />
      <Notifications />
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />
        <Route
          path='/blogs'
          element={<Blogs />}
        />
        <Route
          path='/blogs/:id'
          element={<Blog />}
        />
        <Route
          path='/users'
          element={<Users />}
        />
        <Route
          path='/users/:id'
          element={<User />}
        />
      </Routes>
      <Footer />
    </Container>
  )
}

export default App
