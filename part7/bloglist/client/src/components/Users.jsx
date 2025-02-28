import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { showError } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  useEffect(() => {
    const initializeAsync = async () => {
      try {
        await dispatch(initializeUsers())
      } catch (error) {
        dispatch(showError(`Failed to load users: ${error.response.data.error}`))
      }
    }

    initializeAsync()
  }, [])

  return (
    <div>
      <h2>users</h2>
      <table key='users'>
        <thead>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
