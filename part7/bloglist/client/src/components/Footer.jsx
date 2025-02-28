import { Box, Container, Typography, Button } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Box
        component='footer'
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
        }}
      >
        <Container maxWidth='sm'>
          <Typography variant='body1'>
            Bloglist app by Jarkko Tuikka{' '}
            <a href='https://github.com/jarkkotu/fullstackopen'>
              <Button>Source</Button>
            </a>
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
