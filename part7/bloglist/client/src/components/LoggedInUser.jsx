import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const LoggedInUser = () => {
  const login = useSelector(state => state.login)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  if (!login) {
    return null
  }

  return (
    <>
      {login.name} logged in <button onClick={onLogout}>logout</button>
    </>
  )
}

export default LoggedInUser
