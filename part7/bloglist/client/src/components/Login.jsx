import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { showSuccess, showError } from '../reducers/notificationReducer'

const Login = ({ username, password, setUser, setUsername, setPassword }) => {
  const dispatch = useDispatch()
  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(showSuccess('Login successful'))
    } catch (error) {
      dispatch(showError(`Login failed: ${error.response.data.error}`))
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            name='username'
            data-testid='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            type='password'
            name='password'
            data-testid='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
