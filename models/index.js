const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')

Blog.belongsToMany(User, { through: ReadingList })
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })

module.exports = {
  Blog,
  User,
  ReadingList
}