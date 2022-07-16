

const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env;

const signToken = (user) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (600 * 600),
        data: user
    }, JWT_SECRET);
}

module.exports = {  signToken }