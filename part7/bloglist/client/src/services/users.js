import axios from 'axios'
const baseUrl = '/api/users'

let config = null

const setToken = newToken => {
  config = { headers: { Authorization: `Bearer ${newToken}` } }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newUser => {
  const response = await axios.post(baseUrl, newUser, config)
  return response.data
}

export default { getAll, create, setToken }
