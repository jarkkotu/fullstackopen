import { useState, useEffect } from 'react'
import Notifications from './components/Notifications'
import Login from './components/Login'
import Blogs from './components/Blogs'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
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
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setUser={setUser}
        ></Blogs>
      )}
    </div>
  )
}

export default App
