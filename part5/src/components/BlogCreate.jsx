import { useState, useRef } from 'react'

const BlogCreate = ({
  createBlog,
  setInfoMessage,
  setErrorMessage }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await createBlog({ title, author, url })
      
      setTitle('')
      setAuthor('')
      setUrl('')

      setInfoMessage(`Created new blog; title: ${newBlog.title}, author: ${newBlog.author}, url: ${newBlog.author}`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(`Blog creation failed: ${exception.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}></input>
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogCreate