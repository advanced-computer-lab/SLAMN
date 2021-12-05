import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Update from "./Page/UpdateFlight";
import AdminHome from "../src/Page/AdminHome";
import CreateFlight from "./Page/CreateFlight";
import Signin from "../src/Page/SigninPage";
import SignUp from "../src/Page/SignUp";
import DeleteFlight from "../src/Page/DeleteFight";
import ViewAllFlights from "./Page/ViewAllFlights";
import Homepage from "./Page/WelcomePage";
import ViewAvailableSeats from "./Page/ViewAvailableSeats";

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/viewallflights" element={<ViewAllFlights />} />
          <Route path="/viewavailableseats" element={<ViewAvailableSeats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
