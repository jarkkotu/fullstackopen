const { test, after, before, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token

before(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)

  const loginResponse = await api
    .post('/api/login')
    .send({ username: helper.initialUsers[0].username, password: helper.initialUsers[0].password })

  token = loginResponse.body.token
})

describe('blog', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('get', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(response => {
          assert.strictEqual(response.body.length, helper.initialBlogs.length)
        })
    })

    test('_id is transformed to id', async () => {
      const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
      assert.ok(response.body[0].id)
      assert.ok(!response.body[0]._id)
    })
  })

  describe('post', () => {
    test('post fails if not authorized', async () => {
      const newBlog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'http://test.com',
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd1 = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd1.length, helper.initialBlogs.length)

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haHRpc2FhcmkiLCJpZCI6IjY3OTdhZmMzOGZkOGI3YTUyYzFlYzNjYSIsImlhdCI6MTczODAwNjU3OCwiZXhwIjoxNzM4MDEwMTc4fQ.qEC9tk8b86OtNRusWdkRkox3XARJ1M9B58ZpbxBZuEc')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd2 = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd2.length, helper.initialBlogs.length)
    })

    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'http://test.com',
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
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
          .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .expect(response => assert.strictEqual(response.body.likes, 0))
    })
  })

  describe('delete', () => {
    test('delete fails if not authorized', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('delete fails if user is not owner of the blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const loginResponse = await api
        .post('/api/login')
        .send({ username: helper.initialUsers[1].username, password: helper.initialUsers[1].password })

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${loginResponse.body.token}`)
        .expect(403)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('blog can be removed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('put', () => {
    test('blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      blogToUpdate.likes = 123

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(blogToUpdate)
        .expect(200)
        .expect(response => assert.strictEqual(response.body.likes, blogToUpdate.likes))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})