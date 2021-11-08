import React from "react";
import TextBox from "../Componenets/General/TextBox";
import axios from "axios";
import Button from "../Componenets/General/Buttons";
import { makeStyles } from "@material-ui/core/styles";

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
            title={"Airport"}
            onChange={(e) => {
              setAirport(e.target.value);
            }}
          />
          <div />
        </div>
      </div>
      <div className={classes.updatebutton}>
        <Button title="Add" onClick={handleClick} />
      </div>
    </div>
  );
}
