const CustomApiError = require("./CustomApiError")

class NotFoundError extends CustomApiError{

    handleError(res){
        return res.status(404).json({errors:[this.error]})
    }
}

module.exports = NotFoundError