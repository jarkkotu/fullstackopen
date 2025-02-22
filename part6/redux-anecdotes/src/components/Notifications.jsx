import { useSelector } from 'react-redux'

const Notification = ({ notification }) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

const Notifications = () => {
  const notifications = useSelector(state => state.notifications)
  const notificationObjects = notifications.map(n => <li key={n.id}><Notification notification={n} /></li>)

  const style = {
    listStyleType: 'none',
    padding: 0
  }

  return (
    <div>
      <ul style={style}>
        {notificationObjects}
      </ul>
    </div>
  )
}

export default Notifications