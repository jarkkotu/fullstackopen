import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../services/anecdotes'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {

  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: anecdote => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'ADD', payload: { content: `You created anecdote '${anecdote.content}'` } })
      setTimeout(() => dispatch({ type: 'REM' }), 5000)
    },
    onError: error => {
      console.log(error)
      dispatch({ type: 'ADD', payload: { content: error.response.data.error } })
      setTimeout(() => dispatch({ type: 'REM' }), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
