const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(testHelper.initialBlogs)
    assert.strictEqual(result, 1)
  })
})

describe('totalLikes', () => {
  test('sum the count of total likes in blogs', () => {
    const result = listHelper.totalLikes(testHelper.initialBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favoriteBlog', () => {
  test('find the blog with most likes', () => {
    const result = listHelper.favoriteBlog(testHelper.initialBlogs)
    assert.deepStrictEqual(result, testHelper.initialBlogs[2])
  })
})

describe('mostBlogs', () => {
  test('find the author with most blogs', () => {
    const result = listHelper.mostBlogs(testHelper.initialBlogs)
    assert.strictEqual(result.author, 'Robert C. Martin')
    assert.strictEqual(result.blogs, 3)
  })
})

describe('mostLikes', () => {
  test('find the author with most likes', () => {
    const result = listHelper.mostLikes(testHelper.initialBlogs)
    assert.strictEqual(result.author, 'Edsger W. Dijkstra')
    assert.strictEqual(result.likes, 17)
  })
})