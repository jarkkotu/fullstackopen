import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showSuccess, showError } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleLogin = async event => {
    event.preventDefault()

    try {
      var user = await dispatch(login(username, password))
      setUsername('')
      setPassword('')
      dispatch(showSuccess(`Hello ${user.name}!`))
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
