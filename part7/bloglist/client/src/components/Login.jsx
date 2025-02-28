import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, TextField, Button, Box } from '@mui/material'
import { showSuccess, showError } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedIn = useSelector(state => state.login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (loggedIn) {
    navigate('/blogs')
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      var user = await dispatch(login(username, password))
      setUsername('')
      setPassword('')
      dispatch(showSuccess(`Hello ${user.name}!`))
      navigate('/blogs')
    } catch (error) {
      dispatch(showError(`Login failed: ${error.response.data.error}`))
    }
  }

  return (
    <Container sx={{ mt: 8, mb: 2 }}>
      <Box
        display='flex'
        justifyContent='center'
      >
        <Typography
          variant='h2'
          gutterBottom
        >
          Welcome to blogs
        </Typography>
      </Box>
      <Box
        display='flex'
        justifyContent='center'
      >
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              variant='outlined'
              margin='normal'
              type='text'
              id='username'
              data-testid='username'
              label='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              variant='outlined'
              margin='normal'
              type='password'
              id='password'
              data-testid='password'
              label='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <Button type='submit'>Login</Button>
          </div>
        </form>
      </Box>
    </Container>
  )
}

export default Login
