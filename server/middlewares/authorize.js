const { Project } = require('../models')

module.exports = {
    isAuthorizedAdmin: (req, res, next) => {
        try {
            if(req.user.role === 'admin') {
                next()
            } else {
                res.status(401).json({
                    message: 'Unauthorized'
                })
            }
        } catch(err) {
            res.status(403).json({
                message: 'Forbidden'
            })
        }
    },

    isAuthorizedUser: (req, res, next) => {
        try {
            if(req.user.id.toString() === req.params.id || req.user.role === 'admin') {
                next()
            } else {
                res.status(401).json({
                    message: 'Unauthorized'
                })
            }
        } catch (err) {
            res.status(403).json({
                message: 'Forbidden'
            })
        }
    },

    isAuthorizedProject: (req, res, next) => {
        try {
            Project.findOne({
                _id: req.params.id
            })
            .then(project => {
                if(project.createdBy.equals(req.user.id)) {
                    next()
                } else {
                    res.status(401).json({
                        message: 'Unauthorized'
                    })
                }
            })
            .catch(err => {
                res.status(403).json({
                    message: err.message
                })
            })
        } catch (err) {
            res.status(403).json({
                message: 'Forbidden'
            })
        }
    }
}