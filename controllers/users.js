const router = require('express').Router()

const { User } = require('../models')

//GET all the users 
router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

//POST user 
router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.status(201).json(user)
})

// Middleware for finding the right user
const userFinder = async (req, res, next) => {
    req.user = await User.findOne({
        where: {
            username: req.params.username,
        }
    })

    next();
}

//PUT user 
router.put('/:username', userFinder, async (req, res) => {
    if (req.user) {
        req.user.username = req.body.username 
        await req.user.save()
        res.status(201).json(req.user)
    } else {
        res.status(404).end()
    }
})

module.exports = router