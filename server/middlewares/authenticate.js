const { jwt } = require('../helpers')
const { User } = require('../models')

module.exports = {
    isLogin: (req, res, next) => {
        let payload = jwt.jwtVerify(req.headers.token)

        if (payload) {
            User
                .findById(payload.id)
                .then(user => {
                    if (user) {
                        req.user = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            token: req.headers.token,
                        }
                        next()
                    } else {
                        res.status(401).json({
                            message: 'Unauthorized'
                        })
                    }
                })
                .catch(err => {
                    res.send(500).json({
                        message: err.message
                    })
                })
        } else {
            res.send(401).json({
                message: 'Please provide a valid token'
            })
        }
    }
}