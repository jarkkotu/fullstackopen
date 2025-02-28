import { Link } from 'react-router-dom'
import LoggedInUser from './LoggedInUser'

const Menu = () => {
  return (
    <div>
      <Link
        style={{ margin: 5 }}
        to={'/'}
      >
        blogs
      </Link>
      <Link
        style={{ margin: 5 }}
        to={'/users'}
      >
        users
      </Link>
      <LoggedInUser />
    </div>
  )
}

export default Menu
