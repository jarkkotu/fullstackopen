const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = await User.findById(request.userId)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id,
    comments: []
  })

  const savedBlog = await blog.save()
  Blog.populate(savedBlog, { path: 'user' })
  Blog.populate(savedBlog, { path: 'comments' })
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = await User.findById(request.userId)
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    await Comment.deleteMany({ blog: blog._id.toString() })
    user.blogs = user.blogs.filter(b => b.id !== blog.id)
    user.save()
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'You are not allowed to perform this operation' })
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(updated)
})

blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }

  const comment = new Comment({
    comment: request.body.comment,
    blog: blog._id
  })

  const savedComment = await comment.save()
  Comment.populate(savedComment, { path: 'blog' })
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment)
})

module.exports = blogsRouter
