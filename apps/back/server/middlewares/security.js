const { request, response } = require('express')

const jwt = require('jsonwebtoken')

require('dotenv').config()



const security_post = async (req = request, res = response, next) => {

    try {
        const { token } = req.body
        if (token) {
            const payload = await jwt.verify(token, process.env.SECRETORPRIVATEKEY)

            req.payload   = payload

            next()

        } else {
            return res.status(401).json({ status: 401, msg: "No dispone de un privilegio requerido" })
        }

    } catch (err) {
        return res.status(401).json({ status: 401, msg: "No dispone de un privilegio requerido", err })
    }

}

module.exports = {
     security_post
}