import axios from "axios";
import {ErrorResponse} from "../utils/ErrorResponse.js";
import {LRUCache} from "../utils/LruCache.js";

const lruCache = new LRUCache(2);

const exchangeRateHandler = async (req, res, next) => {
    const baseCurrency = req.query.base_currency;
    const quoteCurrency = req.query.quote_currency;
    const cacheKey = baseCurrency + quoteCurrency;
    const exchangeRateFromCache = lruCache.get(cacheKey);

    if (exchangeRateFromCache) {
        console.log('Exchange rate from LRU cache!');
        req.exchangeRate = exchangeRateFromCache;

        return next();
    }

    try {
        const params = {base: baseCurrency, symbols: `${baseCurrency},${quoteCurrency}`};
        const {data} = await axios.get(`https://api.exchangeratesapi.io/latest`, {params});

        lruCache.set(cacheKey, data);
        req.exchangeRate = data;

        next();
        console.log('Exchange rate from API!');
    } catch (err) {
        next(new ErrorResponse(err.response.data.error, err.response.status));
    }
}

export default exchangeRateHandler;
