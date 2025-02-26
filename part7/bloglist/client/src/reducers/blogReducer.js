import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    append(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      return (state = state.map(x => (x.id === action.payload.id ? action.payload : x)))
    }
  }
})

export const { set, append, update } = blogSlice.actions

export const initialize = () => {
  return async dispatch => {
    const notes = await blogService.getAll()
    dispatch(set(notes))
    return notes
  }
}

export const create = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(append(newBlog))
    return newBlog
  }
}

export const like = id => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const blog = blogs.find(x => x.id === id)
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.put(id, newBlog)
    dispatch(update(updatedBlog))
    return updatedBlog
  }
}

export default blogSlice.reducer
