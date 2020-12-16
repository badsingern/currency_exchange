import express from "express";
import getCurrencyExchange from "../controllers/exchange.js";
import exchangeRequestValidationHandler from "../middleware/validation.js";
import successHandler from "../middleware/success.js";
import exchangeRateHandler from "../middleware/exchangeRate.js";

const router = express.Router();

router.route('/quote').get(exchangeRequestValidationHandler, exchangeRateHandler, getCurrencyExchange, successHandler);

export default router;
