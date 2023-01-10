Logger = require("./Logger");
module.exports = class RequestHandler {
    static sendError(requestId, res, error) {
        Logger.debug("Responding with error");
        Logger.error(
            JSON.stringify({
                requestId: requestId,
                status: error.status || "default 500",
                message: error.verbose
                    ? `Request failed: ${error.verbose}`
                    : `Request failed: ${error.message}`,
            })
        );
        return res.status(error.status || 500).json(error.message);
    }

    static sendErrorMessage(requestId, res, status, message, verbose) {
        Logger.debug("Responding with error message");
        Logger.error(
            JSON.stringify({
                requestId: requestId,
                status: status || "default 500",
                message: verbose
                    ? `Request Failed: ${verbose}`
                    : `Request failed: ${message}`,
            })
        );
        return res.status(status || 500).json(message);
    }

    static sendSuccess(requestId, res, data, status) {
        Logger.debug("Responding with success");
        Logger.debug(
            JSON.stringify({
                requestId: requestId,
                status: status ? status : "default 200",
                message: "Request completed successfully",
            })
        );
        return res.status(status || 200).json(data);
    }
};
