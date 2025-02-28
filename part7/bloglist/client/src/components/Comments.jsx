import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, TextField, Button } from '@mui/material'
import { createComment } from '../reducers/blogReducer'
import { showSuccess, showError } from '../reducers/notificationReducer'

const Comments = ({ blog }) => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()

  const saveNewComment = async () => {
    try {
      if (newComment === null || newComment === undefined || newComment === '') {
        return
      }
      await dispatch(createComment(blog, newComment))
      dispatch(showSuccess(`Created new comment: ${newComment}`))
      setNewComment('')
    } catch (exception) {
      dispatch(showError(`Comment creation failed: ${exception.response.data.error}`))
    }
  }

  return (
    <div>
      <Typography
        mt={5}
        variant='h4'
      >
        comments
      </Typography>
      <Box mb={1}>
        <TextField
          label='comment'
          type='text'
          onChange={({ target }) => setNewComment(target.value)}
        ></TextField>
      </Box>
      <div>
        <Button
          variant='contained'
          onClick={saveNewComment}
        >
          add comment
        </Button>
      </div>

      <ul>
        {blog.comments.map(x => (
          <li key={x.id}>{x.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
