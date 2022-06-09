const jwt  = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
// Authorization: Bearer <token>


const verifyToken = (req, res, next) => {
    // console.log(req)
    try {
        console.log(req.token)
        jwt.verify(req.token,JWT_SECRET)
        next()
    } catch (error) {
        res.sendStatus(401)
    }
    
}

module.exports = {  verifyToken }