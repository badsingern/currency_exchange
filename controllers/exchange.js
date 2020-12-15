// @desc   Get currency exchange
// @route  GET /api/v1/:from/:to
// @access Public
const currencyExchangeController = async (req, res, next) => {
    const baseAmount = req.query.base_amount;
    const quoteCurrency = req.query.quote_currency;
    const exchangeRate = req.exchangeRate;

    const roundedExchangeRate = parseFloat(exchangeRate.rates[quoteCurrency].toFixed(3));
    const quoteAmount = Math.floor(baseAmount * roundedExchangeRate);

    const responseMessage = {
        exchange_rate: roundedExchangeRate,
        quote_amount: quoteAmount
    };

    res.body = responseMessage;
    next();
}

export default currencyExchangeController;
