import { useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {

  const dispatch = useDispatch()

  const voteClick = () => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
  }

  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={voteClick}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote