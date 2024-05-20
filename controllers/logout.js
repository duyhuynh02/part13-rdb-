const { User } = require("../models");
const TokenSession = require("../models/tokensession");
const router = require("./login");


router.delete('/', async (req, res) => {

    const token = await TokenSession.findOne({
        where: {
            id: req.body.id
        }
    })

    if (token) {
        const user = await User.findOne({
            where: {
                id: token.dataValues.userId
            }
        })

        if (user) {
            user.active = false 
            await user.save() 
            console.log('User account is deactive.')
            await token.destroy() 
            res.status(202).json({ message: "Token removed."})
        } else {
            res.status(404).json({ message: "Cannot find user."})
        }

    } else {
        res.status(404).json({ message: "Token remove is failed."})
    }

})

module.exports = router