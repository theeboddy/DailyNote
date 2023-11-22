const jwt = require('jsonwebtoken')
const {secret} = require('../config')
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorizastion.split(' ')[1]
        if(!token) {
            console.log("Пользователь не авторизован")
            return res.status(403)
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        console.log("Пользователь не авторизован")
        return res.status(403)
    }
}