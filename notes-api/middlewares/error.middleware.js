const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
    let message = err.message || 'Internal server error';

    // Mongoose validation error (e.g. missing required field, maxLength exceeded)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(e => e.message).join(', ');
    }

    // Mongoose bad ObjectId format passed to a query
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorMiddleware;