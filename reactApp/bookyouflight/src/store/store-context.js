import { createContext, useState } from "react";

const StoreContext = createContext({
    user: null,
    booking: null,
    setUser: (userInfo) => { },
    setBooking: (bookingInfo) => { }
});

export function StoreConextProvider(props) {
    const [userData, setUserData] = useState();
    const [bookingData, setBookingData] = useState();

    function saveUserData(userInfo) {
        setUserData(userInfo);
    }

    function saveBookingData(bookingInfo) {
        setBookingData(bookingInfo);
    }

    const context = {
        user: userData,
        booking: bookingData,
        setUser: saveUserData,
        setBooking: saveBookingData
    }

    return <StoreContext.Provider value={context}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContext;