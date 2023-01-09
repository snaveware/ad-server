const Logger = require("../Logger");
const requestIp = require("request-ip");
const axios = require("axios");
const sysConfig = require("../Config");
var parser = require("ua-parser-js");

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
    const clientIP = requestIp.getClientIp(req);
    req.clientIP = clientIP;
    next();
};

async function getIPGeolocationDetails(req, res, next) {
    Logger.debug("Obtaining Geolocation Information");
    try {
        const URL = `https://ipgeolocation.abstractapi.com/v1/?api_key=${sysConfig.IP_GEOLOCATION_API_KEY}&ip_address=${req.clientIP}`;
        const response = await axios.get(URL);

        req.geolocationInformation = response.data;
    } catch (error) {
        console.log(error);
    }

    next();
}

async function getIPGeolocationDetailsV2(req, res, next) {
    Logger.debug("Obtaining Geolocation Information");
    try {
        const ip = req.clientIP;
        const URL = `https://global-ds.cloud.netacuity.com/webservice/query?u=1d124ea1-f3f0-4a74-aa38-cd5ec775641c&ip=${ip}&dbs=all&trans_id=example&json=true`;

        const response = await axios.get(URL);

        req.geolocationInformation = response.data.response;
    } catch (error) {
        console.log(error);
    }

    next();
}

/**
 *
 * uses ua-parser
 */
async function getUserAgentInformation(req, res, next) {
    var ua = parser(req.headers["user-agent"]);
    req.useragent = ua;
    next();
}

module.exports = {
    createRequestId,
    logRequests,
    ipMiddleware,
    getIPGeolocationDetails,
    getIPGeolocationDetailsV2,
    getUserAgentInformation,
};
