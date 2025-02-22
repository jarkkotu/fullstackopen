import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
    update(state, action) {
      return state = state.map(x => x.id === action.payload.id ? action.payload : x)
    }
  },
})

export const { set, append, update } = anecdoteSlice.actions

export const initialize = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(set(notes))
  }
}

export const create = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(append(newAnecdote))
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdote = anecdotes.find(x => x.id === id)
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.put(id, newAnecdote)
    dispatch(update(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer