import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showSuccess, showError } from '../reducers/notificationReducer'

const BlogCreate = ({ onCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleCreate = async event => {
    event.preventDefault()

    try {
      // This throws error if fails
      var newBlog = await onCreateBlog({ title, author, url })

      setTitle('')
      setAuthor('')
      setUrl('')

      dispatch(
        showSuccess(
          `Created new blog; title: ${newBlog.title}, author: ${newBlog.author}, url: ${newBlog.url}`
        )
      )
    } catch (exception) {
      dispatch(showError(`Blog creation failed: ${exception.response.data.error}`))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type='text'
            id='newTitle'
            data-testid='newTitle'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author
          <input
            type='text'
            id='newAuthor'
            data-testid='newAuthor'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url
          <input
            type='text'
            id='newUrl'
            data-testid='newUrl'
            name='Url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>

        <button
          id='submit-button'
          type='submit'
        >
          create
        </button>
      </form>
    </div>
  )
}

export default BlogCreate
