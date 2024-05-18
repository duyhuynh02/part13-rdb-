const { ReadingList } = require('../models')

const router = require('express').Router() 

router.post('/', async (req, res) => {
    try {
        const user_blog = await ReadingList.create(req.body)
        res.status(201).json(user_blog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = router