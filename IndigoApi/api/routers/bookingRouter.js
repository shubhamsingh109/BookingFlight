import express from 'express';
import Booking from '../models/bookingModel.js';
const router = express.Router();

router.get('/', (req, res, next) => {
    Booking.find({}).then(booking => {
        res.send(booking);
    }).catch(err => {
        next(err);
    });
});

export const confirmBooking = async (data) => {
    const booking = new Booking({
        flightNumber: data.flightNumber,
        date: new Date(data.date),
        seats: data.seats
    });
    booking.save().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
};


router.delete('/:id', function (req, res, next) {
    Booking.findOneAndDelete({ _id: req.params.id }).then(function (booking) {
        res.send(booking);
    });
});

export default router;