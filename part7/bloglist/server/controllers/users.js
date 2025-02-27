const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    name,
    passwordHash
  })
  const saved = await user.save()
  response.status(201).json(saved)
})

module.exports = usersRouter
