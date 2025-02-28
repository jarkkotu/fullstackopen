import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import LoggedInUser from './LoggedInUser'

const Blogs = () => {
  const togglableRef = useRef()
  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h2>blogs</h2>

      <LoggedInUser />

      <Togglable
        ref={togglableRef}
        buttonLabel='new blog'
        onAfterToggle={() => blogFormRef.current.clear()}
      >
        <BlogForm
          ref={blogFormRef}
          onAfterCreate={() => togglableRef.current.toggleVisibility()}
        />
      </Togglable>

      <br />

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <div
            style={blogStyle}
            key={blog.id}
          >
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  )
}

export default Blogs
