const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later"

  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  // handling mongoose validation errors
  if(err.name ==="ValidationError"){
    customError.msg = "The following validation erros occured: " + Object.values(err.errors).map(item => item.message).join(", ")
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.name === "CastError") {
    customError.msg = `No item found with id ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  // handling duplication errors
  if(err.code && err.code === 11000)
  {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`,
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  // handling all other errors
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandlerMiddleware
