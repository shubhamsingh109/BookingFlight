import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    flightNumber: { type: String, required: true},
    date: { type: Date, required: true},
    seats: { type: Number, required: true}
});

export default mongoose.model('Booking', bookingSchema);