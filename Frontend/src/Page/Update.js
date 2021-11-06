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
  const [deptime, setdeptime] = useState("");
  const [arrtime, setarrtime] = useState("");
  const [econseats, seteconseats] = useState(0);
  const [buissseats, setbuisseats] = useState(0);
  const [airport, setairport] = useState("");
  const [open1, setOpen1] = useState(false);

  const onChangeflight = (e) => {
    setflightnumber(e.target.value);
  };
  const onChangedeptime = (e) => {
    setdeptime(e.target.value);
  };
  const onChangearrtime = (e) => {
    setarrtime(e.target.value);
  };
  const onChangeeconseats = (e) => {
    seteconseats(e.target.value);
  };
  const onChangebuisseats = (e) => {
    setbuisseats(e.target.value);
  };
  const onChangeairport = (e) => {
    setairport(e.target.value);
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
      .post("http://localhost:8000/updateFlight", {
        FlightNumber: flightnumber,
        DepartureDate: deptime,
        ArrivalDate: arrtime,
        EconomySeats: econseats,
        BusinessSeats: buissseats,
        Airport: airport,
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
          <TextBox title="Airport" onChange={onChangeairport}></TextBox>
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
        error="Are you sure you want to delete ?"
        firstbutton="Agree"
        secondbutton="Disagree"
      />
    </div>
  );
};
export default Update;
