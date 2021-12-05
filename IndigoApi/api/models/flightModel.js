import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flightNumber: { type: String, required: true},
    flightName: { type: String, required: true},
    departureTime: { type: Date, required: true},
    totalDuration: { type: Number, required: true},
    price: { type: Number, required: true},
    totalSeat: { type: Number, required: true},
    source: { type: String, required: true},
    destination: { type: String, required: true}
});

export default mongoose.model('Flight', flightSchema);