// @desc   Get currency exchange
// @route  GET /api/v1/route
// @access Public
import {ApiResponse} from "../utils/ApiResponse.js";

const getCurrencyExchange = async (req, res, next) => {
    const baseAmount = req.query.base_amount;
    const quoteCurrency = req.query.quote_currency;
    const exchangeRate = req.exchangeRate;

    const roundedExchangeRate = parseFloat(exchangeRate.rates[quoteCurrency].toFixed(3));
    const quoteAmount = Math.floor(baseAmount * roundedExchangeRate);

    res.body = new ApiResponse(roundedExchangeRate, quoteAmount);
    next();
}

export default getCurrencyExchange;
