import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const LoggedInUser = () => {
  const login = useSelector(state => state.login)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <p>
        {login.name} logged in <button onClick={onLogout}>logout</button>
      </p>
    </div>
  )
}

export default LoggedInUser
