const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((favorite, blog) => (blog.likes > favorite.likes ? blog : favorite), blogs[0])
}

const mostBlogs = blogs => {
  const groups = _.groupBy(blogs, blog => blog.author)
  const authorsAndBlogs = _.map(Object.keys(groups), key => ({
    author: key,
    blogs: groups[key].length
  }))
  return _.maxBy(authorsAndBlogs, o => o.blogs)
}

const mostLikes = blogs => {
  const groups = _.groupBy(blogs, blog => blog.author)
  const authorsAndLikes = _.map(Object.keys(groups), key => ({
    author: key,
    likes: totalLikes(groups[key])
  }))
  return _.maxBy(authorsAndLikes, o => o.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
