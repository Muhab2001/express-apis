

class CustomAPIError extends Error{

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


const createCustomerError = (msg, status) => {
    return new CustomAPIError(msg, status);
}

module.exports = {createCustomerError, CustomAPIError}