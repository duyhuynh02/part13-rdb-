const { ReadingList, User } = require('../models')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const router = require('express').Router() 

router.post('/', async (req, res) => {
    try {
        const user_blog = await ReadingList.create(req.body)
        res.status(201).json(user_blog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

//token decoded 
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

//PUT request 
router.put('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)

    try {
        req.readinglist = await ReadingList.findByPk(req.params.id)
        if (req.readinglist && user.dataValues.id === req.readinglist.userId) {
            req.readinglist.read = req.body.read 
            await req.readinglist.save()
            res.status(201).json(req.readinglist)
        } 
    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = router