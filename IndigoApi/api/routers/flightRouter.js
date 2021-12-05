import express from 'express';
import Flight from '../models/flightModel.js';
import Booking from '../models/bookingModel.js';
const router = express.Router();

// router.get('/all', (req, res, next) => {
//     Flight.find({}).then((flights) => {
//         res.send(flights);
//     }).catch(next);
// });

// this api is exposing flight data and seat availability to other api

router.post('/flightData', (req, res, next) => {
    Flight.find({
        source: req.body.source,
        destination: req.body.destination
    }).then((flights) => {
        Booking.find({
            date: req.body.date
        }).then(booking => {
            flights.filter(flight => {
                const bookedFlight = booking.filter(book => book.flightNumber == flight.flightNumber);
                const bookedSeat = bookedFlight.length > 0 ? bookedFlight.map(x => x.seats).reduce((prev, curr) => prev + curr) : 0;
                flight.totalSeat = flight.totalSeat - bookedSeat;
            });
            res.send(flights);
        })
    }).catch(err => {
        next(err);
    });
});

router.post('/', (req, res, next) => {
    req.body.forEach(bodyData => {
        const flight = new Flight({
            flightNumber: bodyData.flightNumber,
            flightName: bodyData.flightName,
            departureTime: new Date(bodyData.departureTime),
            totalDuration: bodyData.totalDuration,
            price: bodyData.price,
            totalSeat: bodyData.totalSeat,
            source: bodyData.source,
            destination: bodyData.destination
        });
        flight.save().then(result => {
            res.send(result);
        }).catch(err => {
            next(err);
        });
    });
});

// router.delete('/:id', function (req, res, next) {
//     Flight.findOneAndDelete({ _id: req.params.id }).then(function (flight) {
//         res.send(flight);
//     });
// });

export default router;