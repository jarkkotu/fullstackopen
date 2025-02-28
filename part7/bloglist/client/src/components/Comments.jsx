import { useState } from 'react'
import { useDispatch } from 'react-redux'
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
      <h3>comments</h3>
      <input
        type='text'
        onChange={({ target }) => setNewComment(target.value)}
      ></input>
      <button onClick={saveNewComment}>add comment</button>
      <br />
      <ul>
        {blog.comments.map(x => (
          <li key={x.id}>{x.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
