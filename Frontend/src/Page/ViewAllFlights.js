import React, { useEffect, useState } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextBox from "../Componenets/General/TextBox";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  listDiv: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  textbox: {},
  textboxDiv: {
    marginLeft: "5vw !important",
    marginTop: "2vw !important",
  },
}));

export default function ViewAllFlights() {
  const [flights, setFlights] = useState([]);
  const [reset, setReset] = useState(false);
  const [FlightNumber, setFlightNumber] = useState("");
  const [BusinessSeats, setBusinessSeats] = useState("");
  const [EconomySeats, setEconomySeats] = useState("");
  const [DepartureDate, setDepartureDate] = useState("");
  const [ArrivalDate, setArrivalDate] = useState("");
  const [filter, setFilter] = useState({});

  const [test, setTest] = useState([1, 2, 3, 4, 5]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .post("http://localhost:8000/flights/getflights", {}, {})
      .then((res) => {
        console.log(res.data.data);
        setFlights(res.data.data);
        console.log(filter);
      });
  }, [reset]);

  const handleChange = (prop) => (event) => {
    // setFilter(Object.assign({ filter, FlightNumber }));
    // console.log(filter.filter);

    if (prop === "FlightNumber") setFlightNumber(event.target.value);
    if (prop === "EconomySeats") setEconomySeats(event.target.value);
    if (prop === "BusinessSeats") setBusinessSeats(event.target.value);
    if (prop === "DepartureDate") setDepartureDate(event.target.value);
    if (prop === "ArrivalDate") setArrivalDate(event.target.value);
  };
  const handleClick = () => {
    // if(FlightNumber.length !== 0)
    // setFilter(Object.assign({ filter, FlightNumber }));
    var obj = {};
    if (FlightNumber.length !== 0) obj.FlightNumber = FlightNumber;
    if (EconomySeats.length !== 0) obj.EconomySeats = EconomySeats;
    if (BusinessSeats.length !== 0) obj.BusinessSeats = BusinessSeats;
    if (DepartureDate.length !== 0) obj.DepartureDate = DepartureDate;
    if (ArrivalDate.length !== 0) obj.ArrivalDate = ArrivalDate;

    axios
      .post("http://localhost:8000/flights/searchflight", obj, {})
      .then((res) => {
        console.log(res);
        setFlights(res.data.data);
      });
  };
  const handleClick2 = () => {
    setReset(!reset);
  };
  const createObject = (flights) => {
    // const t = Object.assign({ FlightNumber });
  };
  return (
    <div className={classes.root}>
      <div className={classes.listDiv}>
        {flights.map((elem) => (
          <ListItem>
            <ListItemText
              primary={
                "Flight Number: " +
                elem.FlightNumber +
                "    " +
                "Business Seats: " +
                elem.BusinessSeats +
                "    " +
                "Economy Seats: " +
                elem.EconomySeats +
                "    " +
                "Departure Date: " +
                elem.DepartureDate +
                "    " +
                "Arrival Date:" +
                elem.ArrivalDate
              }
            />
          </ListItem>
        ))}
      </div>
      <div className={classes.textboxDiv}>
        <TextBox
          title={"Flight Number"}
          onChange={handleChange("FlightNumber")}
        />
        <TextBox
          title={"Business Seats"}
          onChange={handleChange("BusinessSeats")}
        />
        <TextBox
          title={"Economy Seats"}
          onChange={handleChange("EconomySeats")}
        />
        <TextBox
          title={"Departure Date"}
          onChange={handleChange("DepartureDate")}
        />
        <TextBox
          title={"Arrival Date"}
          onChange={handleChange("ArrivalDate")}
        />
        <Button onClick={handleClick} variant="outlined">
          Search
        </Button>
        <Button onClick={handleClick2} variant="outlined" color="error">
          Remove Filters
        </Button>
      </div>
    </div>
  );
}
