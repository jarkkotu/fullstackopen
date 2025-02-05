import { useRef } from 'react'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogCreate from './BlogCreate'
import LoggedInUser from './LoggedInUser'
import blogService from '../services/blogs'

const Blogs = ({
  blogs,
  setBlogs,
  user,
  setUser,
  setInfoMessage,
  setErrorMessage }) => {

  const blogCreateRef = useRef()

  const createBlog = async (blogObject) => {
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    blogCreateRef.current.toggleVisibility()
    return newBlog
  }

  const updateBlog = async (blogObject) => {
    const newBlog = await blogService.update(blogObject.id, blogObject)
    setBlogs(blogs.map(b => b.id === newBlog.id ? newBlog : b))
    return newBlog
  }

  return (
    <div>
      <h2>blogs</h2>

      <LoggedInUser
        user={user}
        setUser={setUser} />

      <Togglable buttonLabel="new blog" ref={blogCreateRef}>
        <BlogCreate
          createBlog={createBlog}
          setInfoMessage={setInfoMessage}
          setErrorMessage={setErrorMessage}
        />
      </Togglable>

      <br />

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  )
}

export default Blogs