import blogService from '../services/blogs'

const LoggedInUser = ({ user, setUser }) => {
  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(user.token)
  }

  return (
    <div>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>
    </div>
  )
}

export default LoggedInUser