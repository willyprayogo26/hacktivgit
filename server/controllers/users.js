const { User } = require('../models')
const { bcrypt, jwt } = require('../helpers')
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = "412025315797-8k6dkouuopk7m5vhnsrgnvt67g5i6foj.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID)
const axios = require('axios')

let github = axios.create({
    baseURL: 'https://api.github.com'
})

github.defaults.headers.common['Authorization'] = process.env.GITHUB_TOKEN

class UserController {
    static getAllStarred(req, res) {
        github
            .get('/user/starred')
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getRepoByFilter(req, res) {
        github
            .get('/user/starred')
            .then(({ data }) => {
                if (req.query && req.query.name) {
                    data = data.filter(repo => repo.name.includes(req.query.name))
                }
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static createRepo(req, res) {
        github
            .post('/user/repos', { ...req.body })
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getRepoByUsername(req, res) {
        github
            .get(`/search/repositories?q=user:${req.params.username}`)
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                if (err.response.status == 422) {
                    res.status(422).json({
                        message: 'User not found'
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static unstarRepo(req, res) {
        github
            .delete(`/user/starred/${req.params.username}/${req.params.reponame}`)
            .then(() => {
                res.status(200).json({
                    message: `Repository ${req.params.reponame} from username ${req.params.username} unstarred`
                })
            })
            .catch(err => {
                if (err.response.status == 404) {
                    res.status(422).json({
                        message: 'User/repository not found'
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static googleLogin(req, res) {
        let payload = null
        client
            .verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID
            })
            .then(ticket => {
                payload = ticket.getPayload()

                return User
                        .findOne({
                            email: payload.email
                        })

            })
            .then(user => {
                if (!user) {
                    return User
                            .create({
                                name: payload.name,
                                email: payload.email,
                                password: '1Qazxc',
                                pictureProfile: payload.picture,
                                role: 'user'
                            })
                } else {
                    return user
                }
            })
            .then(user => {
                let token = jwt.jwtSign({
                    id: user._id
                })
                res.status(200).json({
                    name: payload.name,
                    email: payload.email,
                    role: payload.role,
                    token: token
                })

            })
            .catch(err => {
                errors = {}

                if (err.errors.name) {
                    errors.title = err.errors.title.message
                }
                if (err.errors.email) {
                    errors.email = err.errors.email.message
                }
                if (err.errors.password) {
                    errors.password = err.errors.password.message
                }

                let keys = Object.keys(errors)
                if (keys.length !== 0) {
                    res.status(400).json(errors)
                } else {
                    res.status(500).json(err)
                }
            })
    }
}

module.exports = UserController