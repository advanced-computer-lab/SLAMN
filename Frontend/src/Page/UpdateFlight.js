import React from "react";
import TextBox from "../Componenets/General/TextBox";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Button from "../Componenets/General/Buttons";
import axios from "axios";
import Popup from "../Componenets/General/PopUp";
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

const Update = () => {
  const classes = useStyles();
  const [flightnumber, setflightnumber] = useState(0);

  const [econseats, seteconseats] = useState(0);
  const [buissseats, setbuisseats] = useState(0);
  const [arrivalairport, setarrivalairport] = useState("");
  const [departureair, setdepartureair] = useState("");
  const [arrtime, setarrivaltime] = useState("");
  const [deptime, setdeptime] = useState("");
  const [open1, setOpen1] = useState(false);

  const onChangeflight = (e) => {
    setflightnumber(e.target.value);
  };
  const onChangedeptime = (e) => {
    setdeptime(e.target.value);
  };
  const onChangearrtime = (e) => {
    setarrivaltime(e.target.value);
  };
  const onChangeeconseats = (e) => {
    seteconseats(e.target.value);
  };
  const onChangebuisseats = (e) => {
    setbuisseats(e.target.value);
  };
  const onChangeairportarrival = (e) => {
    setarrivalairport(e.target.value);
  };
  const onChangeairportdeparture = (e) => {
    setdepartureair(e.target.value);
  };
  const onChangearrival = (e) => {
    setarrivaltime(e.target.value);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose1agree = () => {
    setOpen1(false);

    axios
      .post("http://localhost:8000/flights/updateFlight", {
        FlightNumber: flightnumber,
        DepartureDate: deptime,
        ArrivalDate: arrtime,
        EconomySeats: econseats,
        BusinessSeats: buissseats,
      })
      .then(function (response) {
        console.log(response);
      });
  };

  const handleClick = () => {
    setOpen1(true);
  };
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.space}>
          <TextBox title="Flight Number" onChange={onChangeflight}></TextBox>
        </div>
        <div className={classes.space}>
          <TextBox onChange={onChangedeptime} title="Departure Time"></TextBox>
        </div>
        <div className={classes.space}>
          <TextBox onChange={onChangearrtime} title="Arrival Time"></TextBox>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.space}>
          <TextBox
            onChange={onChangeeconseats}
            title="Available Economy Seats"
          ></TextBox>
        </div>
        <div className={classes.space}>
          <TextBox
            onChange={onChangebuisseats}
            title="Available Buisness Class Seats"
          ></TextBox>
        </div>
        <div className={classes.space}>
          <TextBox
            title="Arrival Airport"
            onChange={onChangeairportarrival}
          ></TextBox>
        </div>
        <div className={classes.space}>
          <TextBox
            title="Departure Airport"
            onChange={setdepartureair}
          ></TextBox>
        </div>
        <div className={classes.space}>
          <TextBox title="Arrival Time" onChange={onChangearrival}></TextBox>
        </div>
        <div className={classes.space}>
          <TextBox title="Departure Time" onChange={onChangedeptime}></TextBox>
        </div>
      </div>
      <div className={classes.updatebutton}>
        <Button title="Update" onClick={handleClick} />
      </div>

      <Popup
        open={open1}
        handleOpen={handleOpen1}
        handleOpenagree={handleClose1agree}
        handleClose={handleClose1}
        className={classes.popup}
        error="Are you sure you want to update ?"
        firstbutton="Agree"
        secondbutton="Disagree"
      />
    </div>
  );
};
export default Update;
