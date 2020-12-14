import express from "express";
import getCurrencyExchange from "../controllers/exchange.js";
import exchangeRequestValidation from "../middleware/validation.js";
import successHandler from "../middleware/success.js";

const router = express.Router();
router.route('/quote').get(exchangeRequestValidation, getCurrencyExchange, successHandler);

export default router;
