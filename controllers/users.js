const router = require('express').Router()

const { User, Blog } = require('../models')

//GET all the users 
router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog, 
            as: 'readings',
            attributes: ['title', 'author']
        }
    })
    res.json(users)
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

//GET specific user 
router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: ['name', 'username'],
        include: {
            model: Blog, 
            as: 'readings',
            attributes: ['id', 'title', 'author', 'url', 'likes', 'year'],
            through: {
                attributes: ['read', 'id']
            }
        }
    }) 

    if (user) {
        res.status(201).json(user)
    } else {
        res.status(404).end()
    }
})

//POST user 
router.post('/', async (req, res) => {
    //try to use try-catch block again for exercise 13.9, feel free to correct me
    try { 
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            res.status(404).json("Validation isEmail on username failed")
        } else {
            res.status(404).json('Other error:', error);
        }
    }

})


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