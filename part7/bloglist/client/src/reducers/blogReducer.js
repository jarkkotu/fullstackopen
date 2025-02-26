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
    },
    remove(state, action) {
      return (state = state.filter(x => x.id !== action.payload.id))
    }
  }
})

export const { set, append, update, remove } = blogSlice.actions

export const initializeBlogs = () => async dispatch => {
  const notes = await blogService.getAll()
  dispatch(set(notes))
  return notes
}

export const createBlog = blog => async dispatch => {
  const newBlog = await blogService.create(blog)
  dispatch(append(newBlog))
  return newBlog
}

export const updateBlog = blog => async dispatch => {
  const updatedBlog = await blogService.update(blog.id, blog)
  dispatch(update(updatedBlog))
  return updatedBlog
}

export const removeBlog = blog => async dispatch => {
  await blogService.remove(blog.id)
  dispatch(remove(blog))
}
export default blogSlice.reducer
