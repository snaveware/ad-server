const Logger = require("../Logger");
const requestIp = require("request-ip");
const axios = require("axios");
const sysConfig = require("../Config");

const uuid4 = require("uuid4");
const { request } = require("express");

function createRequestId(req, res, next) {
    Logger.debug("creating request id");

    const requestId = uuid4();
    req.requestId = uuid4();

    next();
}

function logRequests(req, res, next) {
    Logger.debug("Logging Request");

    message = {
        requestId: req.requestId,
        from: req.get("X-Forwarded-For"),
        method: req.method,
        url: req.originalUrl,
    };

    Logger.debug(JSON.stringify(message));

    next();
}

const ipMiddleware = function (req, res, next) {
    Logger.debug("obtaining IP Address");
    const clientIp = requestIp.getClientIp(req);
    req.clientIp = clientIp;
    next();
};

async function getIPGeolocationDetails(req, res, next) {
    Logger.debug("Obtaining Geolocation Information");
    try {
        const URL = `https://ipgeolocation.abstractapi.com/v1/?api_key=${sysConfig.IP_GEOLOCATION_API_KEY}&ip_address=${req.clientIp}`;
        const response = await axios.get(URL);

        req.geolocationInformation = response.data;
    } catch (error) {
        console.log(error);
    }

    next();
}

async function getUserAgentInformation(req, res, next) {
    next();
}

module.exports = {
    createRequestId,
    logRequests,
    ipMiddleware,
    getIPGeolocationDetails,
};
