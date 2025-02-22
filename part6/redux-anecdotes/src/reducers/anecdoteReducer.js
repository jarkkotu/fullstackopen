import { createSlice } from '@reduxjs/toolkit'

export const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    append(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(i => i.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(x => x.id === id ? changedAnecdote : x)
    },
  },
})

export const { set, append, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer