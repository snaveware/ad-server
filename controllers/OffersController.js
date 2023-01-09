const RequestHandler = require("../RequestHandler");
const {
    validateRandomOfferURLQuery,
    validateSpecificOfferURLQuery,
} = require("../Validators");

const {
    // createTrafficObject,
    createClickObject,
    createTrafficObjectV2,
} = require("../Utils");

const TEST_OFFER = {
    uid: "test offeru id",
    id: "test offer id",
    name: "test offer",
    geo: "test geo value",
    os: "windows 10",
    appid: "test appid value",
    demand_name: "test demand name",
    payout: "5.50",
    click_url: "https://test-click-url.com",
    impression_url: "https://test-impression-url.com",
    click_cap: 1000.1,
    impression_cap: 500.1,
    install_cap: 20,
    status: 1,
    expired: false,
    expired_at: Date.now() + 1000000,
    created_at: Date.now() - 500000,
    updated_at: Date.now() + 10000,
};

module.exports = class OffersController {
    static async logid(req, res) {
        try {
            const validated = validateSpecificOfferURLQuery(req.query);
            /**
             * TODO
             * Get offer using the profivded offer id
             */

            const offer = TEST_OFFER;

            const trafficObj = createTrafficObjectV2(req, offer);

            const clickObj = createClickObject(req, offer);

            RequestHandler.sendSuccess(req.requestId, res, {
                offer: offer,
                trafficObj: trafficObj,
                clickObj: clickObj,
                geolocationInformation: req.geolocationInformation,
                query: validated,
            });
        } catch (error) {
            RequestHandler.sendError(req.requestId, res, error);
        }
    }

    static async logir(req, res) {
        try {
            const validated = validateRandomOfferURLQuery(req.query);

            /**
             * TODO
             * Get random offer
             */

            const offer = TEST_OFFER;

            const trafficObj = createTrafficObjectV2(req, offer);

            const clickObj = createClickObject(req, offer);

            RequestHandler.sendSuccess(req.requestId, res, {
                offer: offer,
                trafficObj: trafficObj,
                clickObj: clickObj,
                geolocationInformation: req.geolocationInformation,
                query: validated,
            });
        } catch (error) {
            res.send(error);
            //RequestHandler.sendError(req.requestId, res, error);
        }
    }
};
