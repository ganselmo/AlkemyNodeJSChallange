const CustomApiError = require("./CustomApiError");

class ServerError extends CustomApiError {

    handleError(res) {
        return res.status(500).json({errors:[this.error]})
    }
}

module.exports=ServerError