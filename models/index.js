const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')
const TokenSession = require('./tokensession')

Blog.belongsToMany(User, { through: ReadingList })
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })

User.hasOne(TokenSession)

TokenSession.belongsTo(User)

module.exports = {
  Blog,
  User,
  ReadingList
}