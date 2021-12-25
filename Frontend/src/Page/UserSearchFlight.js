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
import { useNavigate } from "react-router";
import UserInfo from "../Componenets/Seats/SeatReservationinfo";
import Card from "../Componenets/ViewFlights/Card";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Select from "../Componenets/SearchFlights/Select";
import Dropdown from "../Componenets/SearchFlights/Dropdown";
import Buttons from "../Componenets/General/Buttons";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "85vw",
    borderRadius: "0.5vw",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    marginTop: "1.5vw",
    marginLeft: "2vw",
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
    marginLeft: "1vw",
    background: "white",
    border: " 2px solid #ccc",
    //borderColor: "rgb(0, 93, 173)",
    borderRadius: "0.5vw",
    marginRight: "2vw",
  },
  button: {
    marginTop: "1vw",
    width: "18vw",
    height: "0.5vw",
    marginLeft: "62vw",
    marginBottom: "6vw",
  },
  drop: {
    marginLeft: "1vw",
  },
  arrow: {
    backgroundColor: "rgb(0, 93, 173)",
    marginLeft: "-1vw",
    borderRadius: "50%",
    width: "3vw",
    height: "2vw",
    border: "1px solid black",
    marginTop: "0.5vw",
    // position: "absolute",
    top: "1",
  },
  arrow1: { marginLeft: "0.3vw" },

  t2: {
    marginLeft: "-0.6vw",
  },
});

export default function UserSearchFlight() {
  localStorage.setItem("returnParameters", JSON.stringify({}));

  const admin = window.localStorage.getItem("admin");

  localStorage.removeItem("returnList");
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
  const history = useNavigate();

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen1(false);
  };

  const handleClick = () => {
    const logged = window.localStorage.getItem("logged");
    console.log(logged, "LOGGEDD");

    if (!(logged === "true")) {
      console.log(logged, "LOGGEDD");
      window.location = "/signin";
    } else {
      var obj = {};
      if (departureDate.length !== 0) obj.DepartureDate = departureDate;
      if (arrivalDate.length !== 0) obj.ArrivalDate = arrivalDate;
      if (arrivalAirport.length !== 0) obj.ArrivalAirport = arrivalAirport;
      if (departureAirport.length !== 0)
        obj.DepartureAirport = departureAirport;
      if (flag === 2) obj.isDeparture = true;
      if (flag === 1) obj.isDeparture = false;

      console.log(obj);
      axios
        .post("http://localhost:8000/flights/getflights", obj, {})
        .then((res) => {
          console.log(res, "RESPONSEEEE");
          localStorage.setItem("flightsArray", JSON.stringify(res.data.data));
          localStorage.setItem(
            "passengersList",
            JSON.stringify(passengerslist)
          );
          setFlights(res.data.data);
          if (res.data.data.length != 0) {
            if (passengers === "") {
              setPopup({
                message: "Please select passengers",
                severity: "error",
              });
              console.log("error");
              setOpen1(true);
            } else {
              if (cabin === "") {
                setPopup({
                  message: "Please select Cabin",
                  severity: "error",
                });
                console.log("error");

                setOpen1(true);
              } else {
                console.log("SUCCC");
                console.log(admin);
                if (admin == "true") {
                  history("/viewallflightsadmin");
                }
                if (admin == "false") {
                  history("/viewallflights");
                }
              }
            }
          }
        });
    }
  };

  const handleChange = (prop) => (event) => {
    if (prop === "ArrivalAirport") setArrivalAirport(event.target.value);
    if (prop === "DepartureAirport") setDepartureAirpot(event.target.value);
    if (prop === "ArrivalDate") setArrivalDate(event.target.value);
    if (prop === "DepartureDate") setDepartureDate(event.target.value);
  };
  const handleChangeCabin = (e) => {
    localStorage.setItem("departureCabin", JSON.stringify(e.target.value));
    console.log(e.target.value);
    setCabin(e.target.value);
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
          style={{
            height: "3vw !important",
          }}
        />
        <div className={classes.arrow}>
          <CompareArrowsRoundedIcon
            style={{
              color: "white",
              fontSize: "2vw",
            }}
            className={classes.arrow1}
          />
        </div>
        <div className={classes.t2}>
          <TextField
            placeholder=" Where to ?"
            margin="none"
            variant="outlined"
            onChange={handleChange("ArrivalAirport")}
          />
        </div>
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
        <div className={classes.drop}>
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
        <div className={classes.passengers}>
          <Select
            setPassengers={setPassengers}
            passengers={passengers}
            setPassengersList={setPassengersList}
            passengerslist={passengerslist}
          />
        </div>
      </div>

      <div className={classes.button}>
        <Buttons
          size="small"
          fullWidth={"true"}
          title="FIND FLIGHT"
          onClick={handleClick}
          style={{
            borderRadius: "2vw",
            backgroundColor: "rgb(0, 93, 173)",
            fontSize: "1vw",
          }}
        />
      </div>
      {/* <div className={classes.list}>
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
      </div> */}
      <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose1} severity={popup.severity}>
          {popup.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
