const Blog = require('./blog')

//In case there is no record in the db, it will automatically create new one 
Blog.sync()

module.exports = {
  Blog
}