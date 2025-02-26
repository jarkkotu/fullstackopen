import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { create } from '../reducers/blogReducer'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogCreate from './BlogCreate'
import LoggedInUser from './LoggedInUser'

const Blogs = ({ user, setUser }) => {
  const blogCreateRef = useRef()
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const createBlog = async blogObject => {
    var newBlog = dispatch(create(blogObject))
    blogCreateRef.current.toggleVisibility()
    return newBlog
  }

  return (
    <div>
      <h2>blogs</h2>

      <LoggedInUser
        user={user}
        setUser={setUser}
      />

      <Togglable
        buttonLabel='new blog'
        ref={blogCreateRef}
      >
        <BlogCreate createBlog={createBlog} />
      </Togglable>

      <br />

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
          />
        ))}
    </div>
  )
}

export default Blogs
