const containsToken = (req, res, next) => {
    const tokenHeader = req.headers['x-auth-token'];
    if (tokenHeader) {
        const token = tokenHeader
        req.token = token
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports = { containsToken }