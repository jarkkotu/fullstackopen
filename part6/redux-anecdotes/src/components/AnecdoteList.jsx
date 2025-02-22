import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { error, success } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const voteClick = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(success(`You voted '${anecdote.content}'`))
  }

  return (
    <div>
      {anecdotes
        .filter(a => filter === undefined || filter === null || a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => voteClick(anecdote)}
          />
      )}
    </div>
  )
}

export default AnecdoteList