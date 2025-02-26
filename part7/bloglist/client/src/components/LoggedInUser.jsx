import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const LoggedInUser = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <p>
        {user.name} logged in <button onClick={onLogout}>logout</button>
      </p>
    </div>
  )
}

export default LoggedInUser
