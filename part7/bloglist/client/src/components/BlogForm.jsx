import { useState, forwardRef, useImperativeHandle } from 'react'
import { useDispatch } from 'react-redux'
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
})

export default BlogForm
