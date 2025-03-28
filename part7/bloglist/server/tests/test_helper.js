const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: new mongoose.Types.ObjectId('679790982eef484b6ea36386'),
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: new mongoose.Types.ObjectId('679790982eef484b6ea36386'),
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: new mongoose.Types.ObjectId('679790982eef484b6ea36386'),
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: new mongoose.Types.ObjectId('679790982eef484b6ea36386'),
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: new mongoose.Types.ObjectId('679790982eef484b6ea36386'),
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: new mongoose.Types.ObjectId('679790982eef484b6ea36386'),
    __v: 0
  }
]

const initialUsers = [
  {
    _id: '679790982eef484b6ea36386',
    username: 'user0',
    name: 'user 0',
    password: 'user0-secret',
    passwordHash: '$2b$10$EqoP3Ngobd19yIJ.4kCEjObdzQ4b9nDr2yieUY4OEDzqwHrmUTUP6',
    blogs: [
      new mongoose.Types.ObjectId('5a422a851b54a676234d17f7'),
      new mongoose.Types.ObjectId('5a422aa71b54a676234d17f8'),
      new mongoose.Types.ObjectId('5a422b3a1b54a676234d17f9'),
      new mongoose.Types.ObjectId('5a422b3a1b54a676234d17fa'),
      new mongoose.Types.ObjectId('5a422a851b54a676234d17fb'),
      new mongoose.Types.ObjectId('5a422a851b54a676234d17fc')
    ],
    __v: 0
  },
  {
    _id: '679790982eef484b6ea36387',
    username: 'user1',
    name: 'user 1',
    password: 'user1-secret',
    passwordHash: '$2b$10$RLmdAAqCjaLjfAvHjgFQquZ4rB8baypFsij60b1B176UbTTs2bgMq',
    blogs: [],
    __v: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'title' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb
}
