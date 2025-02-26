import { useState } from 'react'

const Blog = ({ user, blog, onUpdateBlog, onRemoveBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'view'
  const toggleVisibility = () => {
    setVisible(!visible)
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
    display: blog.user !== null && user.username === blog.user.username ? '' : 'none'
  }

  return (
    <div
      id='outer-div'
      style={blogStyle}
    >
      <span
        data-testid='title'
        id='title'
        style={{ fontStyle: 'italic', marginRight: 10 }}
      >
        {blog.title}
      </span>
      <span
        id='author'
        style={{ marginRight: 10 }}
      >
        {blog.author}
      </span>
      <button
        id='visibility-button'
        onClick={toggleVisibility}
      >
        {buttonText}
      </button>
      <div
        id='inner-div'
        style={showWhenVisible}
      >
        <span id='url'>{blog.url}</span> <br />
        <span id='likes'>likes {blog.likes}</span>
        <button
          id='like-button'
          onClick={() => onUpdateBlog({ ...blog, likes: blog.likes + 1 })}
        >
          like
        </button>{' '}
        <br />
        <span id='user-name'>{blog.user !== null ? blog.user.name : ''}</span> <br />
        <button
          id='remove-button'
          style={removeButtonStyle}
          onClick={() => onRemoveBlog(blog)}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
