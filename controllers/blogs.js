const router = require('express').Router()

const { Blog } = require('../models')

// GET all the blogs 
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

//POST a new blog 
app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch(error) {
    res.status(400).json({ error })
  }
})

//DELETE a new blog 
app.delete('/api/blogs/:id', async (req, res) => {
  const deletedBlog = await Blog.findByPk(req.params.id)
  if (deletedBlog) {
    await deletedBlog.destroy()
    res.status(202).json({ message: 'Delete ok.'})
  } else {
    res.status(404).json({ message: 'Blog cannot be deleted.'})
  }
})