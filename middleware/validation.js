import Joi from "joi";
import {ErrorResponse} from "../utils/ErrorResponse.js";

const exchangeRequestValidation = (req, res, next) => {

    const validCurrencyValues = ['USD', 'EUR', 'GBP', 'ILS'];

    const schema = Joi.object().keys({
        base_amount: Joi.number().positive().integer().required(),
        base_currency: Joi.string().valid(...validCurrencyValues).required(),
        quote_currency: Joi.string().valid(...validCurrencyValues).required()
    });

    const {error} = schema.validate({
        base_amount: req.query.base_amount,
        base_currency: req.query.base_currency,
        quote_currency: req.query.quote_currency
    }, {abortEarly: false});

    if (!error) {
        next();
    } else {
        const {details} = error;
        const message = details.map(i => i.message).join(', ');
        next(new ErrorResponse(message, 400));
    }
}

export default exchangeRequestValidation;
