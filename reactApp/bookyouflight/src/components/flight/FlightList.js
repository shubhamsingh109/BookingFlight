import FlightItem from "./FlightItem"

export default function FlightList(props) {
    return (
        <div>
            {props.flightData.length > 0 ?
                <table>
                    <thead>
                        <th>Flight Number</th>
                        <th>Flight Name</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Total Duration</th>
                        <th>Price</th>
                        <th>Available Seats</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {props.flightData.map((flight) => (
                            <FlightItem
                                data={flight}
                                key={flight.flightNumber}
                            />
                        ))}
                    </tbody>
                </table> : <div>No Data to show</div>}

        </div>
    )
}