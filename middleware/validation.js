import Joi from "joi";
import {ErrorResponse} from "../utils/ErrorResponse.js";

const validCurrencyValues = ['USD', 'EUR', 'GBP', 'ILS'];

const schema = Joi.object().keys({
    base_amount: Joi.number().positive().integer().required(),
    base_currency: Joi.string().valid(...validCurrencyValues).required(),
    quote_currency: Joi.string().valid(...validCurrencyValues).required()
});

const exchangeRequestValidationHandler = (req, res, next) => {
    const {error} = schema.validate({
        base_amount: req.query.base_amount,
        base_currency: req.query.base_currency,
        quote_currency: req.query.quote_currency
    }, {abortEarly: false});

    if (!error) {
        return next();
    }

    const message = error.details.map(i => i.message).join(', ');
    next(new ErrorResponse(message, 400));
}

export default exchangeRequestValidationHandler;
