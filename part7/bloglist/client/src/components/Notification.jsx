import Alert from '@mui/material/Alert'

const Notification = ({ notification }) => {
  return (
    <div>{notification && <Alert severity={notification.type}>{notification.content}</Alert>}</div>
  )
}

export default Notification
