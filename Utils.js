const { request } = require("express");

/**
 *
 * uses info from the netacuity api
 * and ua-parser to pass user agent
 */
function createTrafficObjectV2(req, offer) {
    const trafficObj = {
        uid: offer.uid,
        session: req.requestId, // using the generated uuid4 for the traffic
        campaign_id: req.query.campaign_id,
        host: req.get("host"),
        path: req.path,
        env: null, // not sure
        accept_lang: req.headers ? req.headers["accept-language"] : null,
        accept_header: req.headers ? req.headers["accept"] : null,
        referrer: req.headers ? req.headers["referer"] : null,
        domain: req.headers ? req.query.domain : null,
        appid: null, // not sure
        geo: null, // not sure
        region: req.geolocationInformation["pulse-region"],
        city: req.geolocationInformation["pulse-city"],
        os: req.useragent.os.name,
        os_version: req.useragent.os.version,
        browser: req.useragent.browser.name,
        browser_version: req.useragent.browser.version,
        user_ip: req.geolocationInformation.ip,
        user_agent: req.headers ? req.headers["user_agent"] : null,
        creative_id: null, //not sure the meaning
        created_at: Date.now(),
        dsp: req.query.dsp,
        status: offer.status,
        source: req.useragent.ua,
        idfa: req.query.idfa,
        isp: req.geolocationInformation["isp-name"],
        f_click: null, //not sure what it means
        connection_type: null, //not available in netcuity api
        longitude: req.geolocationInformation.longitude,
        latitude: req.geolocationInformation.latitude,
    };

    return trafficObj;
}

function createClickObject(req, offer) {
    const clickObj = {
        click_id: null,
        offer_uid: offer.uid,
        traffic_uid: req.requestId,
        source: req.useragent.ua, //req.useragent.source,
        env: null, //not sure
        created_at: Date.now(),
        thinn_freq: null, //not Sure
    };
    return clickObj;
}

module.exports = {
    createClickObject,
    createTrafficObjectV2,
};
