import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({
  username,
  password,
  setUser,
  setUsername,
  setPassword,
  setInfoMessage,
  setErrorMessage }) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setInfoMessage('Login successful')
      setTimeout(() => setInfoMessage(null), 5000)
    } catch (exception) {
      setErrorMessage(`Login failed: ${exception.response.data.error}`)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login