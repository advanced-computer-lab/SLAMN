import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import SeatPicker from "../Componenets/Seats/SeatPicker";

const useStyles = makeStyles(() => ({
  differentSeats: {
    display: "flex",
    width: "100vw",
    placeContent: "space-evenly",
    height: "5vw",
  },
  title: {
    width: "100%",
    textAlign: "center",
    height: "5vw",
  },
  seats: {
    display: "flex",
  },
  seatpicker: {
    width: "100vw !important",
    textAlign: " -webkit-center",
  },
}));

export default function ViewAvailableSeats() {
  const classes = useStyles();

  return (
    <div>
      <div>NavBar</div>
      <div className={classes.title}>SEAT RESERVATION</div>
      <div className={classes.differentSeats}>
        <div className={classes.seats}>
          <AirlineSeatReclineNormalIcon />
          <div> Available</div>
        </div>
        <div className={classes.seats}>
          <AirlineSeatReclineNormalIcon />
          <div> Occupied</div>
        </div>
        <div className={classes.seats}>
          <AirlineSeatReclineNormalIcon />
          <div> Chosen</div>
        </div>
      </div>
      <div className={classes.seatpicker}>
        <SeatPicker />
      </div>
    </div>
  );
}
