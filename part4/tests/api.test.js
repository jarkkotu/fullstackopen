const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('When there are some notes saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(response => {
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
      })
  })

  test('_id is transformed to id', async () => {
    const response = await api.get('/api/blogs')
    assert.ok(response.body[0].id)
    assert.ok(!response.body[0]._id)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'http://test.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect(response => assert.strictEqual(response.body.title, newBlog.title))
      .expect(response => assert.strictEqual(response.body.author, newBlog.author))
      .expect(response => assert.strictEqual(response.body.url, newBlog.url))
      .expect(response => assert.strictEqual(response.body.likes, newBlog.likes))
      .expect(response => assert.ok(response.body.id))

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  })

  test('invalid blog is not added', async () => {
    const invalidBlogs = [
      {
        likes: 0
      },
      {
        title: 'Test blog',
      },
      {
        title: 'Test blog',
        author: 'Test author'
      },
      {
        title: 'Test blog',
        url: 'http://test.com'
      }]

    for (let invalidBlog of invalidBlogs) {
      await api
        .post('/api/blogs')
        .send(invalidBlog)
        .expect(400)
    }

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('blog without likes defaults to 0', async () => {
    const newBlog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'http://test.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect(response => assert.strictEqual(response.body.likes, 0))
  })

  test('blog can be removed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test('blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = 123

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect(response => assert.strictEqual(response.body.likes, blogToUpdate.likes))
  })
})

after(async () => {
  await mongoose.connection.close()
})