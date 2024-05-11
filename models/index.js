const Blog = require('./blog')
const User = require('./user')

//In case there is no record in the db, it will automatically create new one 
Blog.sync()
User.sync()

module.exports = {
  Blog,
  User
}