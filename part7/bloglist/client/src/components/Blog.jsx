import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Typography, Button } from '@mui/material'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { showSuccess, showError } from '../reducers/notificationReducer'
import Comments from './Comments'

const Blog = () => {
  const { id } = useParams()
  const loggedIn = useSelector(state => state.login)
  const blog = useSelector(state => state.blogs).find(x => x.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!loggedIn) {
    navigate('/')
  }

  const onLikeBlog = async () => {
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
    display: blog.user !== null && loggedIn.username === blog.user.username ? '' : 'none'
  }

  return (
    <div>
      <Typography
        data-testid='title'
        id='title'
        variant='h3'
      >
        {blog.title}
      </Typography>
      <Typography
        data-testid='author'
        id='author'
        variant='h4'
      >
        {blog.author}
      </Typography>
      <Typography
        data-testid='url'
        id='url'
        variant='body1'
      >
        <a href={blog.url}>
          <Button>{blog.url}</Button>
        </a>
      </Typography>
      <div>
        <Typography
          data-testid='likes'
          id='likes'
          variant='body1'
        >
          {blog.likes} likes{' '}
          <Button
            data-testid='like-button'
            id='like-button'
            onClick={onLikeBlog}
            variant='contained'
            size='small'
          >
            like
          </Button>
        </Typography>
        <Typography
          mt={1}
          mb={1}
          data-testid='user-name'
          id='user-name'
          variant='body2'
        >
          added by {blog.user !== null ? blog.user.name : ''}
        </Typography>
        <Button
          id='remove-button'
          data-testid='remove-button'
          style={removeButtonStyle}
          variant='contained'
          color='error'
          onClick={onRemoveBlog}
        >
          remove
        </Button>

        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default Blog
