import Blog from './Blog'
import LoggedInUser from './LoggedInUser'

const Blogs = ({ blogs, user, setUser }) => {
  return (
    <div>
      <h2>blogs</h2>
      {<LoggedInUser user={user} setUser={setUser} />}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs