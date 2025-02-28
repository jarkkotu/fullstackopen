import { useState, forwardRef, useImperativeHandle } from 'react'
import { useDispatch } from 'react-redux'
import { Typography, TextField, Button, Box } from '@mui/material'
import { createBlog } from '../reducers/blogReducer'
import { showSuccess, showError } from '../reducers/notificationReducer'

const BlogForm = forwardRef((props, refs) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleCreate = async event => {
    event.preventDefault()

    try {
      var newBlog = await dispatch(createBlog({ title, author, url }))
      dispatch(showSuccess(`Created new blog; title: ${title}, author: ${author}, url: ${url}`))
      props.onAfterCreate()
    } catch (exception) {
      dispatch(showError(`Blog creation failed: ${exception.response.data.error}`))
    }
  }

  const clear = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useImperativeHandle(refs, () => {
    return { clear }
  })

  return (
    <div>
      <Typography variant='h4'>create new</Typography>
      <form onSubmit={handleCreate}>
        <div>
          <TextField
            margin='dense'
            type='text'
            id='title'
            data-testid='title'
            label='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            margin='dense'
            type='text'
            id='newAuthor'
            data-testid='newAuthor'
            label='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            margin='dense'
            type='text'
            id='newUrl'
            data-testid='newUrl'
            label='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <Box
          mt={1}
          mb={1}
        >
          <Button
            id='submit-button'
            variant='contained'
            type='submit'
          >
            create
          </Button>
        </Box>
      </form>
    </div>
  )
})

export default BlogForm
