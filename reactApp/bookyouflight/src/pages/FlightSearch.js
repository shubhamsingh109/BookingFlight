import { useRef, useState } from 'react';
import './FlightSearch.css';
import FlightData from '../components/flight/FlightData';
import { getFlightData } from '../service/nodeApiService';
import { getTimeFormat, addTime } from '../util/common-util';

export default function FlightSearch() {
    let [flightData, setFlightData] = useState([]);

    const date = useRef();
    const source = useRef();
    const destination = useRef();
    function handleSearch(event) {
        event.preventDefault();
        const searchData = {
            date: date.current.value,
            source: source.current.value,
            destination: destination.current.value
        }
        getFlightData(searchData).then(response => {
            response.data.data.forEach(elm => {
                const arrivalTime = addTime(elm.departureTime, elm.totalDuration);
                elm.departureTime = getTimeFormat(elm.departureTime);
                elm.arrivalTime = getTimeFormat(arrivalTime);
                elm.date = searchData.date
            });
            setFlightData(response.data.data);
        })
    }

    return (
        <div className="container">
            <form onSubmit={handleSearch}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                <input type="date" className="form-control search-slt" required ref={date} />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                <input type="text" className="form-control search-slt" placeholder="Enter Source City" required ref={source} />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                <input type="text" className="form-control search-slt" placeholder="Enter Destination City" required ref={destination} />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                <button className="btn btn-danger big-btn">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <FlightData data={flightData} />
        </div>
    )
}