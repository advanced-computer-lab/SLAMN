import React from "react";
import TextBox from "../Componenets/General/TextBox";
import axios from "axios";
import Button from "../Componenets/General/Buttons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SnackBar from "../Componenets/General/SnackBar";
import NavBar from "../Componenets/General/NavBar";

const useStyles = makeStyles({
  space: {
    marginTop: "2vw !important",
    marginBottom: "2vw !important",
    marginLeft: "1vw",
    background: "#fff",
    display: "flex",
    justifyContent: "space-around",
  },
  root: {
    margin: "auto",
    position: "relative",
    top: "3vw",
    border: "1px solid grey",
    borderRadius: " 0.7vw",
    width: "40vw",
    textAlign: "center",
  },
  updatebutton: {
    textAlign: "-webkit-center",
    marginTop: "4vw",
  },
  title: {
    textAlign: "center",
    width: "30vw",
    height: "5vw",
    fontSize: "2vw",
    border: "1px solid grey",
    borderRadius: " 1.3vw",
    position: "relative",
    top: "2vw",
    color: "slategray",
    textAlign: "center",
    lineHeight: "4vw",
    margin: "auto",
  },
  severalboxes: {
    display: "flex",
  },
});

export default function CreateFlight() {
  const classes = useStyles();
  const date = new Date();
  const history = useNavigate();
  const [FlightNumber, setFlight] = React.useState("");
  const [DepartureDate, setDepartureDate] = React.useState("");
  const [TripDuration, setTripDuration] = React.useState("");
  const [FirstClassSeats, setFirstSeats] = React.useState(-1);
  const [Price, setPrice] = React.useState(0);
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
  const handleClick = async () => {
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
      await axios
        .post(
          "http://localhost:8000/flights/",
          {
            FlightNumber: FlightNumber,
            DepartureDate: DepartureDate,
            ArrivalDate: ArrivalDate,
            DepartureTime: deptime,
            ArrivalTime: arrivaltime,
            EconomySeats: EconomySeats,
            BusinessSeats: BusinessSeats,
            FirstClassSeats: FirstClassSeats,
            ArrivalAirport: Arrairport,
            DepartureAirport: depariport,
            Price: Price,
            TripDuration: TripDuration,
          },
          { headers: { auth: window.localStorage.getItem("token") } }
        )
        .then(function (response) {
          console.log(response);
          history("/homeadmin");
        });
    }
  };
  return (
    <div>
      <NavBar />
      <div className={classes.title}>CREATE FLIGHT</div>

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
            title={"FirstClassSeats"}
            onChange={(e) => {
              setFirstSeats(e.target.value);
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
          <TextBox
            title={"ArrivalDate"}
            onChange={(e) => {
              setArrivalDate(e.target.value);
            }}
          />
        </div>
        <div className={classes.space}>
          <TextBox
            title={"Price"}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <TextBox
            title={"TripDurtion"}
            onChange={(e) => {
              setTripDuration(e.target.value);
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
        </div>
        <div className={classes.space}>
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
        </div>

        <div />
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
