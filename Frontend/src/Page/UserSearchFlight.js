import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FlightIcon from "@mui/icons-material/Flight";
import InfoIcon from "@mui/icons-material/Info";
import SimpleDialog from "../Componenets/UserSearchFlight/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useContext } from "react";
import UserInfo from "../Componenets/Seats/SeatReservationinfo";
import Card from "../Componenets/ViewFlights/Card";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Select from "../Componenets/SearchFlights/Select";
import Dropdown from "../Componenets/SearchFlights/Dropdown";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    marginTop: "1.5vw",
  },
  list: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    display: "flex",
    border: "solid 0.01vw black",
    width: "90vw",
    height: "10vw",
    marginTop: "1vw",
    backgroundColor: "white",
  },
  durationDiv: {
    borderRadius: "1vw",
    height: "2vw",
    width: "11vw",
    backgroundColor: "#f2f2f2",
    marginTop: "4vw",
    marginLeft: "15vw",
  },
  set: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "15vw",
  },
  icon: {
    transform: "rotate(90deg)",
    marginLeft: "1vw",
    marginTop: "0.3vw",
  },
  icon2: {
    marginTop: "4vw",
    marginLeft: "17vw",
  },
  passengers: {
    background: "#f2f2f2",
    border: " 1px solid #ccc",
    borderRadius: "0.5vw",
  },
});

export default function UserSearchFlight() {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState();
  const [reservation, setReservation] = useContext(UserInfo);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("");
  const [flag, setFlag] = useState(0);
  const [flights, setFlights] = useState([]);
  const [selected, setSelected] = useState([]);
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureAirport, setDepartureAirpot] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [cabin, setCabin] = React.useState("");
  const [passengers, setPassengers] = React.useState("");
  const [passengerslist, setPassengersList] = React.useState([]);
  const [open1, setOpen1] = React.useState(false); //snackbar
  const [popup, setPopup] = React.useState({ message: "", severity: "" });

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen1(false);
  };

  const handleClick = () => {
    var obj = {};
    if (departureDate.length !== 0) obj.DepartureDate = departureDate;
    if (arrivalDate.length !== 0) obj.ArrivalDate = arrivalDate;
    if (arrivalAirport.length !== 0) obj.ArrivalAirport = arrivalAirport;
    if (departureAirport.length !== 0) obj.DepartureAirport = departureAirport;
    if (flag === 2) obj.isDeparture = true;
    if (flag === 1) obj.isDeparture = false;

    console.log(obj);
    axios
      .post("http://localhost:8000/flights/getflights", obj, {})
      .then((res) => {
        console.log(res, "RESPONSEEEE");
        setFlights(res.data.data);
      });

    console.log(flights, "flightsssssssssssssssssssss");
  };
  const handleClick2 = (e) => {
    setOpen(true);
    var ths = {};
    ths.FlightNumber = e.value;
    console.log(e.value);
    axios
      .post("http://localhost:8000/flights/getflights", ths, {})
      .then((res) => {
        console.log(res.data.data);
        setSelected(res.data.data);
      });
  };

  const handleChange = (prop) => (event) => {
    if (prop === "ArrivalAirport") setArrivalAirport(event.target.value);
    if (prop === "DepartureAirport") setDepartureAirpot(event.target.value);
    if (prop === "ArrivalDate") setArrivalDate(event.target.value);
    if (prop === "DepartureDate") setDepartureDate(event.target.value);
  };
  const handleChangeCabin = (e) => {
    console.log(e.target.value);
    setCabin(e.target.value);
  };
  const handleChange2 = (event, nextView) => {
    setView(nextView);
    setTimeout(500);
    if (view === "module") setFlag(1);
    if (view === "quilt") setFlag(2);
  };
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <div className={classes.root}>
      <div className={classes.searchBar}>
        <TextField
          placeholder="Where from ?"
          margin="none"
          variant="outlined"
          onChange={handleChange("DepartureAirport")}
        />
        <TextField
          placeholder=" Where to ?"
          margin="none"
          variant="outlined"
          onChange={handleChange("ArrivalAirport")}
        />
        <TextField
          placeholder="Departure date"
          margin="none"
          variant="outlined"
          onChange={handleChange("DepartureDate")}
        />
        <TextField
          placeholder="Return date "
          margin="none"
          variant="outlined"
          onChange={handleChange("ArrivalDate")}
        />
        <div className={classes.passengers}>
          <Select
            setPassengers={setPassengers}
            passengers={passengers}
            setPassengersList={setPassengersList}
            passengerslist={passengerslist}
          />
        </div>

        <Dropdown
          items={["Economy", "Business", "First"]}
          placeholder={"Cabin"}
          value={cabin}
          setCabin={setCabin}
          onChange={(e) => {
            handleChangeCabin(e);
          }}
        />
      </div>
      <Button onClick={handleClick} variant="outlined">
        {" "}
        FIND FLIGHT
      </Button>
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
            }}
            setPopup={setPopup}
            setOpen={setOpen1}
          />
        ))}
      </div>
      <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose1} severity={popup.severity}>
          {popup.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
