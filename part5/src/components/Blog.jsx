import { useState } from 'react'

const Blog = ({ blog, updateBlog, setErrorMessage }) => {

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'view'
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    try {
      const newBlog = { ...blog, 'likes': blog.likes + 1 }
      await updateBlog(newBlog)
    } catch (exception) {
      setErrorMessage(`Adding a like failed: ${exception.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <span style={{ fontStyle: 'italic', marginRight: 10 }}>{blog.title}</span>
      <span style={{ marginRight: 10 }}>{blog.author}</span>
      <button onClick={toggleVisibility}>{buttonText}</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes {blog.likes} <button onClick={addLike}>like</button> <br />
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog