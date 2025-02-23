import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, update } from './services/anecdotes'

const App = () => {

  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: anecdote => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'ADD', payload: { content: `You voted anecdote '${anecdote.content}'` } })
      setTimeout(() => dispatch({ type: 'REM' }), 5000)
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false
  })

  if (result.isPending) {
    return <div>loading data...</div>
  }
  else if (result.isError) {
    console.log(result.error)
    return <div>anecdote service not available due to problems in server</div>
  }
  else {
    console.log(JSON.parse(JSON.stringify(result)))
    const anecdotes = result.data

    return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
