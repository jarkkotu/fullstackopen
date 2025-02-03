import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
      {user === null ?
        <Login
          username={username}
          password={password}
          setUser={setUser}
          setUsername={setUsername}
          setPassword={setPassword}
          setErrorMessage={setErrorMessage}>
        </Login> :
        <Blogs
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setUser={setUser}
          newBlogTitle={newBlogTitle}
          setNewBlogTitle={setNewBlogTitle}
          newBlogAuthor={newBlogAuthor}
          setNewBlogAuthor={setNewBlogAuthor}
          newBlogUrl={newBlogUrl}
          setNewBlogUrl={setNewBlogUrl}
          setErrorMessage={setErrorMessage}>
        </Blogs>
      }
    </div>
  )
}

export default App