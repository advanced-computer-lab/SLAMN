import React from "react";
import Navbar from "../Componenets/General/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Componenets/ViewFlights/Card";
import background from "../Images/bgImage1.jpg";

const useStyles = makeStyles({
  list: {
    display: "flex",
    flexDirection: "column",
    // backgroundImage: `url(${background})`,
  },
});

export default function DisplayAllFlights() {
  const flights = JSON.parse(localStorage.getItem("flightsArray"));
  const cabin = JSON.parse(localStorage.getItem("departureCabin"));
  const passengerslist = JSON.parse(localStorage.getItem("passengersList"));
  const passengers = passengerslist.length;
  const classes = useStyles();
  const [open1, setOpen1] = React.useState(false); //snackbar
  const [popup, setPopup] = React.useState({ message: "", severity: "" });
  return (
    <div>
      <Navbar />
      <div className={classes.list}>
        {flights.map((n) => (
          <Card
            flight={{
              FlightNumber: n.FlightNumber,
              Price: n.Price,
              DepartureAirport: n.DepartureAirport,
              DepartureTime: n.DepartureTime,
              DepartureDate: n.DepartureDate,
              ArrivalAirport: n.ArrivalAirport,
              ArrivalTime: n.ArrivalTime,
              ArrivalDate: n.ArrivalDate,
              passengers: passengers,
              Cabin: cabin,
              passengerslist: passengerslist,
              TripDuration: n.TripDuration,
              BaggageAllowance: n.BaggageAllowance ? n.BaggageAllowance : "",
            }}
            setPopup={setPopup}
            setOpen={setOpen1}
          />
        ))}
      </div>
    </div>
  );
}
