import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Box, AppBar, Toolbar, Button, Typography } from '@mui/material'
import { logout } from '../reducers/loginReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = useSelector(state => state.login)

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {login && (
            <Button
              color='inherit'
              component={Link}
              to='/blogs'
            >
              blogs
            </Button>
          )}
          {login && (
            <Button
              color='inherit'
              component={Link}
              to='/users'
            >
              users
            </Button>
          )}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          {login && (
            <Typography variant='body1'>
              {login.name} logged in
              <Button
                color='inherit'
                onClick={onLogout}
              >
                Logout
              </Button>
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
