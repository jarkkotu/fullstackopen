import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Notifications from './components/Notifications'
import Login from './components/Login'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import { initialize } from './reducers/blogReducer'
import { showSuccess, showError } from './reducers/notificationReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const initializeAsync = async () => {
      try {
        await dispatch(initialize())
      } catch (error) {
        dispatch(showError(`Failed to initialize: ${error.response.data.error}`))
      }
    }

    initializeAsync()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notifications />

      {user === null ? (
        <Login
          username={username}
          password={password}
          setUser={setUser}
          setUsername={setUsername}
          setPassword={setPassword}
        ></Login>
      ) : (
        <Blogs
          user={user}
          setUser={setUser}
        ></Blogs>
      )}
    </div>
  )
}

export default App
