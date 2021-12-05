import axios from "axios";

const serverUrl = "http://localhost:8090/"

export function signUpService(userData) {
    return axios.post(`${serverUrl}User`, userData);
}

export function getFlightData(searchData) {
    return axios.post(`${serverUrl}flightData`, searchData);
}

export function confirmBooking(data) {
    return axios.post(`${serverUrl}flightData/confimation`, data);
}

export function signIn(data) {
    return axios.post(`${serverUrl}User/signIn`, data);
}