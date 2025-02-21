import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes
        .filter(a => filter === undefined || filter === null || a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) =>  b.votes - a.votes)
        .map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(vote(anecdote.id))}
          />
      )}
    </div>
  )
}

export default AnecdoteList