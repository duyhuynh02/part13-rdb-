
const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

app.use(express.json())


// class Blog extends Model {}

// Blog.init({
//   id: {
//     type: DataTypes.INTEGER, 
//     primaryKey: true, 
//     autoIncrement: true 
//   }, 
//   author: {
//     type: DataTypes.TEXT,
//   },
//   url: {
//     type: DataTypes.TEXT, 
//     allowNull: false
//   }, 
//   title: {
//     type: DataTypes.TEXT, 
//     allowNull: false 
//   },
//   likes: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0
//   }
// }, {
//   sequelize, 
//   underscored: true, 
//   timestamps: false, 
//   modelName: 'blog'
// })


//In case there is no record in the db, it will automatically create new one 
// Blog.sync()

// GET all the blogs 
// app.get('/api/blogs', async (req, res) => {
//   const blogs = await Blog.findAll()
//   res.json(blogs)
// })

// //POST a new blog 
// app.post('/api/blogs', async (req, res) => {
//   try {
//     const blog = await Blog.create(req.body)
//     res.json(blog)
//   } catch(error) {
//     res.status(400).json({ error })
//   }
// })

// //DELETE a new blog 
// app.delete('/api/blogs/:id', async (req, res) => {
//   const deletedBlog = await Blog.findByPk(req.params.id)
//   if (deletedBlog) {
//     await deletedBlog.destroy()
//     res.status(202).json({ message: 'Delete ok.'})
//   } else {
//     res.status(404).json({ message: 'Blog cannot be deleted.'})
//   }
// })

// const PORT = process.env.PORT || 3001 
const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
  })
}

start()