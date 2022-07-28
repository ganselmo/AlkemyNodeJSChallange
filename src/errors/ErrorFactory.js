const  errorMap  = require("./ErrorMap");
const ServerError = require("./ServerError")
class ErrorFactory {

    errorMap = []

    constructor() {
        this.errorMap = errorMap;
    }


    createError(error,res) {

        let newError;
        if (error.name && error.name in this.errorMap) {
            newError = new (this.errorMap[error.name])(error)
        }
        else{
            newError = new ServerError(error)
        }

        newError.handleError(res)

    }
}

module.exports=new ErrorFactory()