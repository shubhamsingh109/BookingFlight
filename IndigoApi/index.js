import express from 'express';
import bodyParser from 'body-parser';

import flightRoute from './api/routers/flightRouter.js';
import bookingRoute from './api/routers/bookingRouter.js';

import messageQueue from './config/consumer.js';
import { connectDb } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Acees-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/IndigoApi', flightRoute);
app.use('/Book', bookingRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

app.listen(PORT, () => {
    console.log(`you are server is running on ${PORT}`);
})