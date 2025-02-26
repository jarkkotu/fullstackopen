import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog, updateBlog, removeBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogCreate from './BlogCreate'
import LoggedInUser from './LoggedInUser'

const Blogs = ({ user, setUser }) => {
  const blogCreateRef = useRef()
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const onCreateBlog = async blog => {
    var newBlog = await dispatch(createBlog(blog))
    blogCreateRef.current.toggleVisibility()
    return newBlog
  }

  const onUpdateBlog = async blog => {
    try {
      const updatedBlog = await dispatch(updateBlog(blog))
      dispatch(showSuccess(`Added like to blog ${updatedBlog.title} by ${updatedBlog.author}`))
    } catch (error) {
      dispatch(showError(`Adding a like failed: ${error.response.data.error}`))
    }
  }

  const onRemoveBlog = async blog => {
    try {
      await dispatch(removeBlog(blog))
      dispatch(showSuccess(`Removed blog ${blog.title} by ${blog.author}`))
    } catch (error) {
      dispatch(showError(`Removing the blog failed: ${error.response.data.error}`))
    }
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
        <BlogCreate onCreateBlog={onCreateBlog} />
      </Togglable>

      <br />

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            onUpdateBlog={onUpdateBlog}
            onRemoveBlog={onRemoveBlog}
          />
        ))}
    </div>
  )
}

export default Blogs
