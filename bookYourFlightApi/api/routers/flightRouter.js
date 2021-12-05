import express from 'express';
import axios from 'axios';
const router = express.Router();
import { sendMessageToQueue } from '../../producer.js';

router.post('/', (req, res, next) => {
    axios.post('http://localhost:8080/IndigoApi/flightData', {
        source: req.body.source,
        destination: req.body.destination,
        date: req.body.date
    }).then(response => {
        res.statusCode = 200;
        res.send({
            data: response.data,
            code: 1
        });
    }).catch(err => {
        res.statusCode = 500;
        res.send({
            data: err,
            code: 0
        })
    })
});

router.post('/confimation', async (req, res, next) => {
    let data = {
        flightNumber: req.body.flightNumber,
        date: new Date(req.body.date),
        seats: req.body.seats
    }
    await sendMessageToQueue('ConfirmBooking', data);
    res.statusCode = 200;
    res.send({
        message: 'Booked',
        code: 1
    });
});

export default router;