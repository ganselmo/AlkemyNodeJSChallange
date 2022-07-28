const CustomApiError = require("./CustomApiError");

class ValidationError extends CustomApiError{

    handleError(res){
        return res.status(400).json(this.error)
    }
}

module.exports=ValidationError