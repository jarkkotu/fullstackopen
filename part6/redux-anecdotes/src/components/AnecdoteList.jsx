import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  return (
    <div>
      {anecdotes
        .filter(a => filter === undefined || filter === null || a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
          />
      )}
    </div>
  )
}

export default AnecdoteList