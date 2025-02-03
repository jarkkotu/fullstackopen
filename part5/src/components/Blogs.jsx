import Blog from './Blog'
import BlogCreate from './BlogCreate'
import LoggedInUser from './LoggedInUser'

const Blogs = ({
  blogs,
  setBlogs,
  user,
  setUser,
  newBlogTitle,
  setNewBlogTitle,
  newBlogAuthor,
  setNewBlogAuthor,
  newBlogUrl,
  setNewBlogUrl,
  setErrorMessage }) => {
  return (
    <div>
      <h2>blogs</h2>

      {<LoggedInUser
        user={user}
        setUser={setUser} />}

      <BlogCreate
        blogs={blogs}
        setBlogs={setBlogs}
        title={newBlogTitle}
        setTitle={setNewBlogTitle}
        author={newBlogAuthor}
        setAuthor={setNewBlogAuthor}
        url={newBlogUrl}
        setUrl={setNewBlogUrl}
        setErrorMessage={setErrorMessage} />

      <br />

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog} />
      )}
    </div>
  )
}

export default Blogs