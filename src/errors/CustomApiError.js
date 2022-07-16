class CustomApiError {

    error;
    constructor(error) {
        this.error = error
    }

    handleError(res){
        return res.status(500).json(this.error)
    }

}

module.exports = CustomApiError