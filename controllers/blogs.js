const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User, ReadingList } = require('../models')
const { SECRET } = require('../util/config')

// GET all the blogs 
router.get('/', async (req, res) => {
  try {
    const where = req.query.search ? {
      [Op.or]: [
        { title: { [Op.iLike]: `%${req.query.search}%` }}, 
        { author: { [Op.iLike]: `%${req.query.search}%` }}, 
      ]
    } : {}

    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: [
        {
          model: User, 
          attributes: ['name']
        },
      ],
      where,
      order: [
        ['likes', 'DESC']
      ]
    });
    res.json(blogs); 
  } catch (error) {
      console.log(error)  //debugging purpose
      res.status(500).json({ error: 'An error occurred while fetching'})
  }

})

//Login user 
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}


//POST a new blog 
router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    //13.24, the same applied for PUT. 
    if (user.active === true) { 
      const blog = await Blog.create({...req.body, userId: user.dataValues.id })
      res.status(201).json(blog)
    } else {
      res.status(400).json({ 'error': "This user is not active now."})
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
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
router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  if (req.blog && user.dataValues.id === req.blog.userId) {
    await req.blog.destroy()
    res.status(202).json({ message: 'Delete ok.'})
  } else {
    res.status(404).json({ message: 'Blog cannot be deleted or this is not the same user.'})
  }
})

module.exports = router