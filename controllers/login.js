const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/tokensession')

router.post('/', async (req, res) => {

    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })

    const passwordCorrect = req.body.password === 'password'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username, 
    id: user.id, 
  }

  const token = jwt.sign(userForToken, SECRET)

  // console.log('token: ', token)
  // console.log('user id: ', user.id)

  const session = await Session.create({ 
    token: token, 
    userId: user.id
  })

  if (session && user) {
    user.active = true 
    await user.save()
    console.log('User account is active.') //for debugging, of course. 
  }

  res 
    .status(200)
    .send({ token, username: user.username, name: user.name, email: user.email })

})

module.exports = router 