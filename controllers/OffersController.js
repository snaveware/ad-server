const RequestHandler = require("../RequestHandler");

module.exports = class OffersController {
    static async logid(req, res) {
        RequestHandler.sendSuccess(
            req.requestId,
            res,
            req.geolocationInformation
        );
    }

    static async logir(req, res) {
        RequestHandler.sendSuccess(
            req.requestId,
            res,
            req.geolocationInformation
        );
    }
};
