import express from "express";
import getCurrencyExchange from "../controllers/exchange.js";

const router = express.Router();
router.route('/quote').get(getCurrencyExchange);

export default router;
