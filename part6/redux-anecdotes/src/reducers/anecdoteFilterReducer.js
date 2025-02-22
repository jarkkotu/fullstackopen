import { createSlice } from '@reduxjs/toolkit'

export const initialState = ''

const anecdoteFilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filter(state, action) {
      return action.payload
    },
  },
})

export const { filter } = anecdoteFilterSlice.actions
export default anecdoteFilterSlice.reducer