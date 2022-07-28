const ValidationError = require("./ValidationError")
const NotFoundError = require("./NotFoundError")
const ServerError = require("./ServerError")

const errorMap = {

    'SequelizeValidationError': ValidationError,
    'NotFoundError': NotFoundError,
    'SequelizeUniqueConstraintError': ValidationError,
    'ServerError': ServerError,

}

module.exports = errorMap