import { useContext, useRef } from 'react';
import StoreContext from '../store/store-context';
import { confirmBooking } from '../service/nodeApiService';
import { useNavigate } from 'react-router-dom';
export default function FlightBooking() {
    const storeCtx = useContext(StoreContext);
    const numberOfSeats = useRef();
    const navigate = useNavigate();
    let content = false;
    if (storeCtx.booking) {
        content = true;
    }

    function flightBookingHandler() {
        if (numberOfSeats.current.value) {
            confirmBooking({
                flightNumber: storeCtx.booking.flightNumber,
                date: storeCtx.booking.date,
                seats: numberOfSeats.current.value
            }).then(response => {
                if (response.status === 200) {
                    if (response.data.code === 1) {
                        //booked
                        navigate('/');
                    }
                }
            })
        }
    }
    return (
        <div>
            {content ?
                <div>
                    <div>Flight Booking Data</div>
                    <br />
                    <div className="row">
                        <div className="col-sm-4">Date of Booking: </div>
                        <div className="col-sm-4">{storeCtx.booking.date}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">Flight Number: </div>
                        <div className="col-sm-4">{storeCtx.booking.flightNumber}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">Flight Name: </div>
                        <div className="col-sm-4">{storeCtx.booking.flightName}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">Departure Time: </div>
                        <div className="col-sm-4">{storeCtx.booking.departureTime}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">Arrival Time: </div>
                        <div className="col-sm-4">{storeCtx.booking.arrivalTime}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">Total Duration: </div>
                        <div className="col-sm-4">{storeCtx.booking.totalDuration} Mins</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">Price Per Seat: </div>
                        <div className="col-sm-4">₹{storeCtx.booking.price}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">Number of Seats: </div>
                        <div className="col-sm-4">
                            <input type="number" required ref={numberOfSeats} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <button className="btn btn-primary" onClick={flightBookingHandler}>Book Flight</button>
                        </div>
                    </div>
                </div> : 'No found'}

        </div>
    )
}