const { request, response } = require('express')
const { validationResult } = require('express-validator')

const validarCampos = (req = request, res = response, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const msg = errors.errors[0].msg
    return res.status(400).json({ status: '400', msg, errors })
  }
  next()
}

module.exports = {
  validarCampos
}