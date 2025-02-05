import { useState } from 'react'

const Blog = ({
  user,
  blog,
  updateBlog,
  removeBlog,
  setInfoMessage,
  setErrorMessage }) => {

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'view'
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    try {
      const newBlog = { ...blog, 'likes': blog.likes + 1 }
      await updateBlog(newBlog)
      setInfoMessage(`Added like to blog ${blog.title} by ${blog.author}`)
      setTimeout(() => setInfoMessage(null), 5000)
    } catch (exception) {
      setErrorMessage(`Adding a like failed: ${exception.response.data.error}`)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleRemove = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await removeBlog(blog)
        setInfoMessage(`Removed blog ${blog.title} by ${blog.author}`)
        setTimeout(() => setInfoMessage(null), 5000)
      }
    } catch (exception) {
      setErrorMessage(`Removing the blog failed: ${exception.response.data.error}`)
      setTimeout(() => setErrorMessage(null), 5000)

    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    color: 'red',
    display: user.username == blog.user.username ? '' : 'none'
  }

  return (
    <div style={blogStyle}>
      <span style={{ fontStyle: 'italic', marginRight: 10 }}>{blog.title}</span>
      <span style={{ marginRight: 10 }}>{blog.author}</span>
      <button onClick={toggleVisibility}>{buttonText}</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes {blog.likes} <button onClick={handleLike}>like</button> <br />
        {blog.user.name} <br />
        <button style={removeButtonStyle} onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog