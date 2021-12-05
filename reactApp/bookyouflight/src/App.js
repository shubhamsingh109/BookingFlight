import './App.css';
import { Route, Routes } from "react-router-dom"
import FlightSearch from './pages/FlightSearch';
import SignUp from './pages/signup';
import NavMenu from './components/layout/NavMenu';
import FlightBooking from './pages/flightBooking';
import SignIn from './pages/signin';

function App() {
  return (
    <div>
      <NavMenu />
      <br />
      <Routes>
        <Route path="/" element={<FlightSearch />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="/bookFlight" element={<FlightBooking />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
