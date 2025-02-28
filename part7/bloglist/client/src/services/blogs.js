import axios from 'axios'
const baseUrl = '/api/blogs'

let config = null

const setToken = newToken => {
  config = { headers: { Authorization: `Bearer ${newToken}` } }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}

const remove = async id => {
  await axios.delete(`${baseUrl}/${id}`, config)
}

const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
  return response.data
}

export default { getAll, create, update, remove, createComment, setToken }
