import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Update from "./Page/UpdateFlight";
import AdminHome from "../src/Page/AdminHome";
import CreateFlight from "./Page/CreateFlight";
import Signin from "./Page/Signin";
import DeleteFlight from "../src/Page/DeleteFight";
import ViewAllFlights from "./Page/ViewAllFlights";

import Home from "../src/Page/Home";
import AccountDetails from "./Page/AccountDetails";
import UpdateAccountDeatils from "../src/Page/UpdateAccount";
import Booking from "../src/Page/Booking";
import ChangePassword from "../src/Page/ChangePassword";
import ViewAvailableSeats from "./Page/ViewAvailableSeats";
import SignUp from "../src/Page/SignUp";
import UserSearchFlight from "./Page/UserSearchFlight";
import UserInfo from "./Componenets/Seats/SeatReservationinfo";
import ViewBookings from "../src/Page/Reservation";
import ReturnFlightBooking from "./Page/ReturnFlightBooking";
import Summary from "./Componenets/Reservation/Summary";

function App() {
  const [reservation, setReservation] = React.useState({
    Cabin: "",
    FlightNumber: "",
    passengerslist: [],
    price: 0,
    DepartureAirport: "",
    ArrivalAirport: "",
  });

  return (
    <div>
      <BrowserRouter>
        <UserInfo.Provider value={[reservation, setReservation]}>
          <Routes>
            <Route path="/updateflight" element={<Update />} />
            <Route path="/homeadmin" element={<AdminHome />} />
            <Route path="/addflight" element={<CreateFlight />} />
            <Route path="/deleteflight" element={<DeleteFlight />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/viewallflights" element={<ViewAllFlights />} />
            <Route path="/search" element={<UserSearchFlight />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<AccountDetails />} />
            <Route path="/updateaccount" element={<UpdateAccountDeatils />} />
            <Route path="/bookflight" element={<Booking />} />
            <Route path="/bookreturnflight" element={<ReturnFlightBooking />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/createsummary" element={<Summary />} />
            <Route
              path="/viewavailableseats"
              element={<ViewAvailableSeats />}
            />{" "}
            <Route path="/viewbookings" element={<ViewBookings />} />
          </Routes>
        </UserInfo.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
