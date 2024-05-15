const { User, Blog } = require('../models')
const { sequelize } = require('../util/db')

const router = require('express').Router() 

//GET all the authors 
router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
      attributes: [
                    'author', 
                    [sequelize.fn('SUM', sequelize.col('likes')), 'total_likes'],
                    [sequelize.fn('COUNT', sequelize.col('title')), 'articles' ],
                  ],
      group: ['author'],
      order: [[sequelize.literal('total_likes'), 'DESC']]
    });
    
    res.json(authors)
})


module.exports = router