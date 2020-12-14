import axios from "axios";
import {ErrorResponse} from "../utils/ErrorResponse.js";

// @desc   Get currency exchange
// @route  GET /api/v1/:from/:to
// @access Public
const getCurrencyExchange = async (req, res, next) => {
    const baseAmount = req.query.base_amount;
    const baseCurrency = req.query.base_currency;
    const quoteCurrency = req.query.quote_currency;

    try {
        const currencyRate = await axios.get(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}&symbols=${baseCurrency},${quoteCurrency}`);
        const exchangeRate = parseFloat(currencyRate.data.rates[quoteCurrency].toFixed(3));
        const quoteAmount = Math.floor(baseAmount * exchangeRate);

        const responseMessage = {
            exchange_rate: exchangeRate,
            quote_amount: quoteAmount
        };

        res.body = responseMessage;
        next();
    } catch (err) {
        next(new ErrorResponse(err.response.data.error, err.response.status));
    }
}

export default getCurrencyExchange;
