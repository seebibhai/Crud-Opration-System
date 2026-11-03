const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // PostgreSQL unique constraint violation error code (e.g. duplicate email)
    if (err.code === '23505') {
        return res.status(400).json({ success: false, error: 'Email already exists.' });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;