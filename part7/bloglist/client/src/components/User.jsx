import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, Button } from '@mui/material'

const User = () => {
  const navigate = useNavigate()
  const loggedIn = useSelector(state => state.login)
  const { id } = useParams()
  const user = useSelector(state => state.users).find(x => x.id === id)

  if (!loggedIn) {
    navigate('/')
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography
        data-testid='title'
        id='title'
        variant='h3'
      >
        {user.name}
      </Typography>
      <Typography
        mt={2}
        variant='body1'
      >
        added blogs
      </Typography>
      <ul>
        {user.blogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
