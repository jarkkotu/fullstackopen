const Notification = ({ infoMessage, errorMessage }) => {
  return (
    <div>
      {infoMessage === null ? null : <div className='success'>{infoMessage}</div>}
      {errorMessage === null ? null : <div className='error'>{errorMessage}</div>}
    </div>
  )
}

export default Notification
