import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'
import { initializeUsers } from '../reducers/userReducer'
import { showError } from '../reducers/notificationReducer'

const Users = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.login)
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

  if (!loggedIn) {
    navigate('/')
  }

  return (
    <Container sx={{ mt: 0, mb: 2 }}>
      <Box
        display='flex'
        justifyContent='center'
      >
        <Typography variant='h2'>users</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: 'lightblue', color: 'white' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...users]
              .sort((a, b) => b.blogs.length - a.blogs.length)
              .map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Button
                      color='inherit'
                      component={Link}
                      to={`/users/${user.id}`}
                    >
                      {user.name}
                    </Button>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Users
