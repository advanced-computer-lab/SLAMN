import React from "react";
import Select from "../Componenets/SearchFlights/Select";
import NavBar from "../Componenets/General/NavBar";
import Popup from "../Componenets/NavBar/PopUpNavBar";
import Side from "../Componenets/AccountDetails/SideDetails";
import AccountForm from "../Componenets/AccountDetails/AccountForm";
import Card from "../Componenets/ViewFlights/Card";
import Passenger from "../Componenets/Reservation/Passenger";
import DatePicker from "../Componenets/Reservation/DatePicker";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Passenger />
      <DatePicker />
    </div>
  );
}
