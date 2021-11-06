import React from "react";
import TextBox from "../Componenets/General/TextBox";
import axios from "axios";

export default function CreateFlight() {
  const date = new Date();
  const [FlightNumber, setFlight] = React.useState("");
  const [DepartureDate, setDepartureDate] = React.useState("");
  const [ArrivalDate, setArrivalDate] = React.useState("");
  const [EconomySeats, setEconomySeats] = React.useState(0);
  const [BusinessSeats, setBusinessSeats] = React.useState(0);
  const [Airport, setAirport] = React.useState("");

  const handleClick = () => {
    axios
      .post("http://localhost:8000/addFlight", {
        FlightNumber: FlightNumber,
        DepartureDate: DepartureDate,
        ArrivalDate: ArrivalDate,
        EconomySeats: EconomySeats,
        BusinessSeats: BusinessSeats,
        Airport: Airport,
      })
      .then(function (response) {
        console.log(response);
      });
  };
  return (
    <div>
      <TextBox
        title={"FlightNumber"}
        onChange={(e) => {
          setFlight(e.target.value);
        }}
      />
      <TextBox
        title={"DepartureDate"}
        onChange={(e) => {
          setDepartureDate(e.target.value);
        }}
      />
      <TextBox
        title={"ArrivalDate"}
        onChange={(e) => {
          setArrivalDate(e.target.value);
        }}
      />
      <TextBox
        title={"EconomySeats"}
        onChange={(e) => {
          setEconomySeats(e.target.value);
        }}
      />
      <TextBox
        title={"BusinessSeats"}
        onChange={(e) => {
          setBusinessSeats(e.target.value);
        }}
      />
      <TextBox
        title={"Airport"}
        onChange={(e) => {
          setAirport(e.target.value);
        }}
      />
      <button onClick={handleClick}>SUBMIT</button>
    </div>
  );
}
