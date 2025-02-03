import blogService from '../services/blogs'

const BlogCreate = ({
  blogs,
  setBlogs,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  setErrorMessage }) => {

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url
      })
      
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setErrorMessage(exception)
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