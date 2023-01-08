const { request } = require("express");

function createTrafficObject(req, offer) {
    const trafficObj = {
        uid: offer.uid,
        session: req.requestId, // using the generated uuid4 for the traffic
        campaign_id: req.query.campaign_id,
        host: request.headers.host,
        path: req.path,
        env: null, // not sure
        accept_lang: req.headers["accept-language"],
        accept_header: req.headers.accept,
        referrer: req.headers["referer"],
        domain: req.query.domain,
        appid: null, // not sure
        geo: null, // not sure
        region: req.geolocationInformation.region,
        city: req.geolocationInformation.city,
        os: req.useragent.os,
        os_version: null,
        browser: req.useragent.browser,
        browser_version: req.useragent.version,
        user_ip: req.geolocationInformation.ip_address,
        user_agent: req.headers.user_agent,
        creative_id: null, //not sure the meaning
        created_at: Date.now(),
        dsp: req.query.dsp,
        status: offer.status,
        source: req.useragent.source,
        idfa: req.query.idfa,
        isp: req.geolocationInformation.connection
            ? req.geolocationInformation.connection.isp_name
            : null,
        f_click: null, //not sure what it means
        connection_type: req.geolocationInformation.connection
            ? req.geolocationInformation.connection.connection_type
            : null,
        longitude: req.geolocationInformation.connection
            ? req.geolocationInformation.longitude
            : null,
        latitude: req.geolocationInformation.connection
            ? req.geolocationInformation.latitude
            : null,
    };

    return trafficObj;
}

function createClickObject(req, offer) {
    const clickObj = {
        click_id: null,
        offer_uid: offer.uid,
        traffic_uid: req.requestId,
        source: req.useragent.source,
        env: null, //source
        created_at: Date.now(),
        thinn_freq: null, //not Sure
    };
    return clickObj;
}

module.exports = {
    createTrafficObject,
    createClickObject,
};
