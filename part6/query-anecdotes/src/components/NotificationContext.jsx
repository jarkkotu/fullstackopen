import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return action.payload.content
    case "REM":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NotificationContext