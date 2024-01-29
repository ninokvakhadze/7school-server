const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `invalid error ${err.path}: ${err.value} `;
  return new AppError(message, 404);
};

const handleDuplicateFields = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `duplicate field value: ${value} please use another value`;
  return new AppError(message, 404);
};

const handleValidationDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `invalid input data ${errors.join('. ')}`;
  return new AppError(message, 404);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleJWTError = (err) =>
  new AppError('invalid token. please log in again', 401);

  const handleJWTExpired = err =>   new AppError('invalid token has expired! please log in again', 401);
  
const sendErrorProd = (err, res) => {
  //operational trusted error send message
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // programing or other unknown error: don't leak error details
  else {
    //1)log error
    //2) send error
    res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack)

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === 'ValidationError') error = handleValidationDB(error);
    sendErrorProd(err, res);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpired();
  }
};
