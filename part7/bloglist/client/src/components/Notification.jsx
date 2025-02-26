const Notification = ({ notification }) => {
  return <div className={notification.type}>{notification.content}</div>
}

export default Notification
