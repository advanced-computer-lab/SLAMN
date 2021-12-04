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
});

export default function UserSearchFlight() {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState("");
  const [flag, setFlag] = useState(0);
  const [flights, setFlights] = useState([]);
  const [selected, setSelected] = useState([]);
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureAirport, setDepartureAirpot] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

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
        console.log(res.data.data);
        setFlights(res.data.data);
      });
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
        <ToggleButtonGroup
          orientation="vertical"
          value={view}
          exclusive
          onChange={handleChange2}
        >
          <ToggleButton value="module" aria-label="module">
            Departure Flight{" "}
          </ToggleButton>
          <ToggleButton value="quilt" aria-label="quilt">
            Arrival Flight{" "}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Button onClick={handleClick} variant="outlined">
        {" "}
        FIND FLIGHT
      </Button>
      <div className={classes.list}>
        {flights.map((elem) => (
          <div className={classes.item}>
            <div className={classes.set}>
              <p>
                {"Departure·"} {elem.DepartureAirport}
              </p>
              <p>{elem.DepartureDate}</p>
              <p>{elem.DepartureTime}</p>
            </div>
            <div className={classes.durationDiv}>
              {elem.TripDuration}
              <FlightIcon className={classes.icon} />
            </div>
            <div className={classes.set}>
              <p>
                {"Arrival·"} {elem.ArrivalAirport}
              </p>
              <p>{elem.ArrivalDate}</p>
              <p>{elem.ArrivalTime}</p>
            </div>
            <InfoIcon
              value={"asds"}
              onClick={(e) => handleClick2(e)}
              className={classes.icon2}
            />
            <SimpleDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
            <Dialog onClose={handleClose} open={open}>
              <DialogTitle>Flight Details</DialogTitle>
              <p>{selected.ArrivalAirport}</p>
              <p>{selected.ArrivalDate}</p>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
