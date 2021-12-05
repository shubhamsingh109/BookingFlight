import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreContext from '../../store/store-context';
export default function FlightItem(props) {
    const storeCtx = useContext(StoreContext);
    const navigate = useNavigate();

    function bookingHandler() {
        if (storeCtx.user) {
            storeCtx.setBooking(props.data);
            navigate('/bookFlight');
        } else {
            navigate('/signUp');
        }

    }

    return (
        <tr>
            <td>{props.data.flightNumber}</td>
            <td>{props.data.flightName}</td>
            <td>{props.data.departureTime}</td>
            <td>{props.data.arrivalTime}</td>
            <td>{props.data.totalDuration} Mins</td>
            <td>{props.data.price}</td>
            <td>{props.data.totalSeat}</td>
            <td>
                <button className="btn btn-success" onClick={bookingHandler}>Book</button>
            </td>
        </tr>
    )
}