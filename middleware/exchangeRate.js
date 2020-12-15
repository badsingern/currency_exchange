import axios from "axios";
import {ErrorResponse} from "../utils/ErrorResponse.js";
import LRU from "lru-cache";

const lruCache = new LRU(2);

const exchangeRateHandler = async (req, res, next) => {
    const baseCurrency = req.query.base_currency;
    const quoteCurrency = req.query.quote_currency;
    const cacheKey = baseCurrency + quoteCurrency;

    if (lruCache.get(cacheKey)) {
        console.log('Exchange rate from LRU cache!');
        req.exchangeRate = lruCache.get(cacheKey);
        return next();
    }

    try {
        const {data} = await axios.get(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}&symbols=${baseCurrency},${quoteCurrency}`);
        lruCache.set(cacheKey, data);
        req.exchangeRate = data;
        console.log('Exchange rate from API!');
        next();
    } catch (err) {
        next(new ErrorResponse(err.response.data.error, err.response.status));
    }
}

export default exchangeRateHandler;
