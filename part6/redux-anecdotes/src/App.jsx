import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { set } from './reducers/anecdoteReducer'

import Notifications from './components/Notifications'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll()
      .then(x => dispatch(set(x)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notifications />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App