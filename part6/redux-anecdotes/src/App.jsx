import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialize } from './reducers/anecdoteReducer'

import Notifications from './components/Notifications'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initialize())
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