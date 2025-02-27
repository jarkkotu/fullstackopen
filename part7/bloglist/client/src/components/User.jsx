import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users).find(x => x.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>added blogs</p>
      <ul>
        {user.blogs.map(blog => {
          //console.log(blog)
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
