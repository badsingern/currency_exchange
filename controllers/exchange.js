import axios from "axios";
import {ErrorResponse} from "../utils/ErrorResponse.js";

// @desc   Get currency exchange
// @route  GET /api/v1/:from/:to
// @access Public
const getCurrencyExchange = async (req, res, next) => {
    try {
        const baseAmount = req.query.base_amount || 100;
        const baseCurrency = req.query.base_currency;
        const quoteCurrency = req.query.quote_currency;
        const isCurrencySupport = ![baseCurrency, quoteCurrency].find(c => !['USD', 'EUR', 'GBP', 'ILS'].includes(c));

        if (![baseCurrency, quoteCurrency].every(c => c.length === 3)) {
            return next(new ErrorResponse(`currency parameters pattern incorrected`, 400));
        }

        if (!isCurrencySupport) {
            return next(new ErrorResponse(`Requested currencies not supported please use: ${['USD', 'EUR', 'GBP', 'ILS']}`, 400));
        }

        if (!baseCurrency || !quoteCurrency) {
            return next(new ErrorResponse('Wrong request parameters', 400));
        }

        const currencyRate = await axios.get(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}&symbols=${baseCurrency},${quoteCurrency}`);
        const exchangeRate = parseFloat(currencyRate.data.rates[req.query.quote_currency].toFixed(3));
        const quoteAmount = Math.floor(baseAmount * exchangeRate);

        res.status(200).json({
            success: true, message: {
                exchange_rate: exchangeRate,
                quote_amount: quoteAmount
            }
        });
    } catch (err) {
        next(new ErrorResponse(err.response.data.error, err.response.status));
    }
}

export default getCurrencyExchange;
