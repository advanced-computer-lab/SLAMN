import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Update from "./Page/UpdateFlight";
import AdminHome from "../src/Page/AdminHome";
import CreateFlight from "./Page/CreateFlight";
import Signin from "../src/Page/Signin";
import DeleteFlight from "../src/Page/DeleteFight";
import ViewAllFlights from "./Page/ViewAllFlights";
import Homepage from "./Page/WelcomePage";
import Home from "../src/Page/Home";
import AccountDetails from "./Page/AccountDetails";
import UpdateAccountDeatils from "../src/Page/UpdateAccount";
import Booking from "../src/Page/Booking";
import ChangePassword from "../src/Page/ChangePassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/updateflight" element={<Update />} />
          <Route path="/homeadmin" element={<AdminHome />} />
          <Route path="/addflight" element={<CreateFlight />} />
          <Route path="/deleteflight" element={<DeleteFlight />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/viewallflights" element={<ViewAllFlights />} />

          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<AccountDetails />} />
          <Route path="/updateaccount" element={<UpdateAccountDeatils />} />
          <Route path="/bookflight" element={<Booking />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
