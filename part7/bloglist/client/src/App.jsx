import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link, Navigate, useParams, useNavigate, useMatch } from 'react-router-dom'
import Notifications from './components/Notifications'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { showSuccess, showError } from './reducers/notificationReducer'
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
    <div>
      <Notifications />
      {login === null ? (
        <Login />
      ) : (
        <Routes>
          <Route
            path='/'
            element={<Blogs />}
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
      )}
      <div>
        <br></br>
        Bloglist app by Jarkko Tuikka See{' '}
        <a href='https://github.com/jarkkotu/fullstackopen'>
          https://github.com/jarkkotu/fullstackopen
        </a>{' '}
        for the source code.
      </div>
    </div>
  )
}

export default App
