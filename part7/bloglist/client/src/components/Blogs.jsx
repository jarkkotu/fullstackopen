import { useRef } from 'react'
import { useSelector } from 'react-redux'
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
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  const navigate = useNavigate()
  const togglableRef = useRef()
  const blogFormRef = useRef()
  const loggedIn = useSelector(state => state.login)
  const blogs = useSelector(state => state.blogs)

  if (!loggedIn) {
    navigate('/')
  }

  return (
    <Container sx={{ mt: 0, mb: 2 }}>
      <Box
        display='flex'
        justifyContent='center'
      >
        <Typography variant='h2'>blogs</Typography>
      </Box>
      <Box mb={1}>
        <Togglable
          ref={togglableRef}
          buttonLabel='new blog'
          onAfterToggle={() => blogFormRef.current.clear()}
        >
          <BlogForm
            ref={blogFormRef}
            onAfterCreate={() => togglableRef.current.toggleVisibility()}
          />
        </Togglable>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: 'lightblue', color: 'white' }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map(blog => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Button
                      color='inherit'
                      component={Link}
                      to={`/blogs/${blog.id}`}
                    >
                      {blog.title}
                    </Button>
                  </TableCell>
                  <TableCell>{blog.author}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Blogs
