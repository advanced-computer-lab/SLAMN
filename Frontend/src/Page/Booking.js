import React from "react";
import NavBar from "../Componenets/General/NavBar";
import Bookfirst from "../Componenets/Reservation/BookingDetails";
import { makeStyles } from "@material-ui/core/styles";
import ViewAvailableSeats from "./ViewAvailableSeats";
const useStyles = makeStyles({
  root: {
    background: " gainsboro",
    width: "100%",
    height: "100vw",
  },
  blockSearch: {
    background: "white",
    width: "100vw",
    height: "9vw",
    fontSize: "2vw",

    boxShadow: "1px 2px 1px #9E9E9E",
  },
  trip: {
    marginTop: "2vw",
    fontWeight: "600",
    fontSize: "2vw",
    marginLeft: "1.6vw",
  },
});

export default function Booking() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <ViewAvailableSeats />
    </div>
  );
}
