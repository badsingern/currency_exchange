import express from "express";
import dotEnv from "dotenv";
import router from "./routes/exchange.js";
import errorHandler from "./middleware/error.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotEnv.config({path: './config/config.env'});

// Mount routers
app.use('/api/v1', router);

// Mount Error Handler
app.use(errorHandler);

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
