const Joi = require("joi");
const Logger = require("./Logger");

function validateSpecificOfferURLQuery(query) {
    const schema = Joi.object({
        offer: Joi.string().required(),
        campaign_id: Joi.string().required(),
        idfa: Joi.string().required(),
        domain: Joi.string().domain().required(),
        dsp: Joi.string().required(),
        site_id: Joi.number().required(),
    });

    const { value, error } = schema.validate(query);

    if (error) {
        Logger.error(error);
        const err = new Error(error.details[0].message);
        err.status = 400;
        throw err;
    }

    return value;
}

function validateRandomOfferURLQuery(query) {
    const schema = Joi.object({
        campaign_id: Joi.string().required(),
        idfa: Joi.string().required(),
        domain: Joi.string().domain().required(),
        dsp: Joi.string().required(),
        site_id: Joi.string().required(),
    });

    const { value, error } = schema.validate(query);

    if (error) {
        Logger.error(error);
        const err = new Error(error.details[0].message);
        err.status = 400;
        throw err;
    }

    return value;
}

module.exports = { validateSpecificOfferURLQuery, validateRandomOfferURLQuery };
