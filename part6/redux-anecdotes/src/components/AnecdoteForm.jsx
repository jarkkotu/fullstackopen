import { useDispatch } from 'react-redux'
import { append } from '../reducers/anecdoteReducer'
import { success } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.create(content)
    dispatch(append(newAnecdote))
    dispatch(success(`You created '${content}'`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm