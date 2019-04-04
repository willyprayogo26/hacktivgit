const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

module.exports = {
    hashPassword: (password) => {
        return bcrypt.hashSync(password, salt)
    },
    comparePassword: (password, hash) => {
        return bcrypt.compareSync(password, hash)
    }
}