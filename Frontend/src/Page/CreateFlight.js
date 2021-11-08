import React from "react";
import TextBox from "../Componenets/General/TextBox";
import axios from "axios";
import Button from "../Componenets/General/Buttons";
import { makeStyles } from "@material-ui/core/styles";

import { useState } from "react";
import SnackBar from "../Componenets/General/SnackBar";

const useStyles = makeStyles({
  space: {
    marginTop: "2vw !important",
    marginLeft: "1vw",
  },
  root: {
    display: "flex",
  },
  updatebutton: {
    marginTop: "3vw",
    marginLeft: "1vw",
  },
});

export default function CreateFlight() {
  const classes = useStyles();
  const date = new Date();
  const [FlightNumber, setFlight] = React.useState("");
  const [DepartureDate, setDepartureDate] = React.useState("");
  const [ArrivalDate, setArrivalDate] = React.useState("");
  const [EconomySeats, setEconomySeats] = React.useState(-1);
  const [BusinessSeats, setBusinessSeats] = React.useState(-1);
  const [Arrairport, setArrairport] = React.useState("");
  const [depariport, setdepairport] = React.useState("");
  const [arrivaltime, setarrivaltime] = React.useState("");
  const [deptime, setdeptime] = React.useState("");
  const [open1, setOpen1] = useState(false);
  const [error, seterror] = useState("");
  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClick = () => {
    if (
      FlightNumber === "" ||
      DepartureDate.length === "" ||
      ArrivalDate.length === "" ||
      EconomySeats.length === -1 ||
      BusinessSeats.length === -1 ||
      Arrairport.length === "" ||
      depariport.length === "" ||
      arrivaltime.length === "" ||
      deptime.length === ""
    ) {
      seterror("Fields cannot be left empty");
      handleOpen1();
      console.log(BusinessSeats);
    } else {
      axios
        .post("http://localhost:8000/flights/addFlight", {
          FlightNumber: FlightNumber,
          DepartureDate: DepartureDate,
          ArrivalDate: ArrivalDate,
          EconomySeats: EconomySeats,
          BusinessSeats: BusinessSeats,
          ArrivalAirport: arrivaltime,
          DepartureAirport: deptime,
          DepartureTime: deptime,
          ArrivalTime: arrivaltime,
        })
        .then(function (response) {
          console.log(response);
        });
    }
  };
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.space}>
          <TextBox
            title={"FlightNumber"}
            onChange={(e) => {
              setFlight(e.target.value);
            }}
          />
        </div>
        <div className={classes.space}>
          <TextBox
            title={"DepartureDate"}
            onChange={(e) => {
              setDepartureDate(e.target.value);
            }}
          />
        </div>
        <div className={classes.space}>
          <TextBox
            title={"ArrivalDate"}
            onChange={(e) => {
              setArrivalDate(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.space}>
          <TextBox
            title={"EconomySeats"}
            onChange={(e) => {
              setEconomySeats(e.target.value);
            }}
          />
        </div>
        <div className={classes.space}>
          <TextBox
            title={"BusinessSeats"}
            onChange={(e) => {
              setBusinessSeats(e.target.value);
            }}
          />
        </div>
        <div className={classes.space}>
          <TextBox
            title={"Arrival Airport "}
            onChange={(e) => {
              setArrairport(e.target.value);
            }}
          />
          <TextBox
            title={"Arrival Time "}
            onChange={(e) => {
              setarrivaltime(e.target.value);
            }}
          />
          <TextBox
            title={"Departure Airport "}
            onChange={(e) => {
              setdepairport(e.target.value);
            }}
          />
          <TextBox
            title={"Departure Time"}
            onChange={(e) => {
              setdeptime(e.target.value);
            }}
          />
          <div />
        </div>
      </div>
      <div className={classes.updatebutton}>
        <Button title="Add" onClick={handleClick} />
      </div>
      <SnackBar
        open={open1}
        handleOpen={handleOpen1}
        handleClose={handleClose1}
        error={error}
      />
    </div>
  );
}
