const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
    jwtSign: (data) => {
        return jwt.sign(data, JWT_SECRET)
    },
    jwtVerify: (token) => {
        try {
            return jwt.verify(token, JWT_SECRET)
        }
        catch (error) {
            return null
        }
    }
}