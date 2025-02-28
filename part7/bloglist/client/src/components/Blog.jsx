import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { showSuccess, showError } from '../reducers/notificationReducer'

const Blog = () => {
  const { id } = useParams()
  const login = useSelector(state => state.login)
  const blog = useSelector(state => state.blogs).find(x => x.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onUpdateBlog = async () => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1 }
      const updatedBlog = await dispatch(updateBlog(newBlog))
      dispatch(showSuccess(`Added like to blog ${updatedBlog.title} by ${updatedBlog.author}`))
    } catch (error) {
      dispatch(showError(`Adding a like failed: ${error.response.data.error}`))
    }
  }

  const onRemoveBlog = async () => {
    try {
      await dispatch(removeBlog(blog))
      dispatch(showSuccess(`Removed blog '${blog.title}' by '${blog.author}'`))
      navigate('/')
    } catch (error) {
      dispatch(showError(`Removing the blog failed: ${error.response.data.error}`))
    }
  }

  if (!blog) {
    return null
  }

  const removeButtonStyle = {
    color: 'red',
    display: blog.user !== null && login.username === blog.user.username ? '' : 'none'
  }

  return (
    <div>
      <h2
        data-testid='title'
        id='title'
        style={{ marginRight: 10 }}
      >
        {blog.title}
      </h2>
      <h2
        data-testid='author'
        id='author'
        style={{ marginRight: 10 }}
      >
        {blog.author}
      </h2>
      <div>
        <a
          data-testid='url'
          id='url'
          href='{blog.url'
        >
          {blog.url}
        </a>
        <br />
        <span
          data-testid='likes'
          id='likes'
        >
          likes {blog.likes}
        </span>
        <button
          data-testid='like-button'
          id='like-button'
          onClick={onUpdateBlog}
        >
          like
        </button>
        <br />
        <span
          data-testid='user-name'
          id='user-name'
        >
          added by {blog.user !== null ? blog.user.name : ''}
        </span>
        <br />
        <button
          id='remove-button'
          style={removeButtonStyle}
          onClick={onRemoveBlog}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
