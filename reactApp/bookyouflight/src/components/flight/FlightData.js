import FlightList from "./FlightList";

export default function FlightData(props) {
    return (
        <div>
            <h2>Flights Data</h2>
            <div>
                <FlightList flightData={props.data} />
            </div>
        </div>
    )
}