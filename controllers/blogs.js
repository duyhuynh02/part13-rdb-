const router = require('express').Router()

const { Blog } = require('../models')

// GET all the blogs 
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

//POST a new blog 
router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.status(201).json(blog)
})

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next(); 
}

//PUT a new blog (likes?)
router.put('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        req.blog.likes = req.body.likes 
        await req.blog.save()
        res.status(201).json(req.blog)
    } else {
        res.status(404).end()
    }
})

//DELETE a new blog 
router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
    res.status(202).json({ message: 'Delete ok.'})
  } else {
    res.status(404).json({ message: 'Blog cannot be deleted.'})
  }
})

module.exports = router