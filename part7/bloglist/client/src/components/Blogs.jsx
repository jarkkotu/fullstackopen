import { useRef } from 'react'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogCreate from './BlogCreate'
import LoggedInUser from './LoggedInUser'
import blogService from '../services/blogs'

const Blogs = ({ blogs, setBlogs, user, setUser, setInfoMessage, setErrorMessage }) => {
  const blogCreateRef = useRef()

  const createBlog = async blogObject => {
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    blogCreateRef.current.toggleVisibility()
    return newBlog
  }

  const updateBlog = async blogObject => {
    const newBlog = await blogService.update(blogObject.id, blogObject)
    setBlogs(blogs.map(b => (b.id === newBlog.id ? newBlog : b)))
    return newBlog
  }

  const removeBlog = async blogObject => {
    await blogService.remove(blogObject.id)
    setBlogs(blogs.filter(b => b.id !== blogObject.id))
  }

  return (
    <div>
      <h2>blogs</h2>

      <LoggedInUser
        user={user}
        setUser={setUser}
      />

      <Togglable
        buttonLabel='new blog'
        ref={blogCreateRef}
      >
        <BlogCreate
          createBlog={createBlog}
          setInfoMessage={setInfoMessage}
          setErrorMessage={setErrorMessage}
        />
      </Togglable>

      <br />

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            setInfoMessage={setInfoMessage}
            setErrorMessage={setErrorMessage}
          />
        ))}
    </div>
  )
}

export default Blogs
