module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HANDLE_UNEXPECTED_EXCEPTIONS_IN_LOGGER:
        process.env.HANDLE_UNEXPECTED_EXCEPTIONS_IN_LOGGER,
    LOGGING_LEVEL: process.env.LOGGING_LEVEL || "info",
};
