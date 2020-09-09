const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({
            message: 'No Token'
        })
    }
    try {
        //decode the token
        req.user = jwt.verify(token, "demosecret")
        next()
    } catch (e) {
        res.status(400).json({
            message: 'Invalid Token'
        })
    }
}

module.exports = auth