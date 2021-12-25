import React, { useEffect, useState } from "react";
import Navbar from "../Componenets/General/NavBar2";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Componenets/ViewFlights/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import PopUp from "../Componenets/UpdateFlight/PopUp";
import SnackBar from "../Componenets/General/SnackBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopupDelete from "../Componenets/General/PopUp";

const useStyles = makeStyles({
  list: {
    display: "flex",
    flexDirection: "column",
    // backgroundImage: `url(${background})`,
  },
  edit: {
    marginTop: "-23vw",
    marginLeft: "65vw",
  },
  delete: {
    marginTop: "-23vw",
    marginLeft: "1vw",
  },
  display: {
    display: "flex",
  },
  button: {
    marginTop: "1vw",
    width: "15vw",
    height: "1vw",
    marginLeft: "3vw",
    marginBottom: "5vw",
  },
});

export default function DisplayFlightsAdmin() {
  const flights = JSON.parse(localStorage.getItem("flightsArray"));
  const cabin = JSON.parse(localStorage.getItem("departureCabin"));
  const passengerslist = JSON.parse(localStorage.getItem("passengersList"));
  const passengers = passengerslist.length;
  const navigate = useNavigate();
  const classes = useStyles();
  const [open1, setOpen1] = React.useState(false); //snackbar
  const [popup, setPopup] = React.useState({ message: "", severity: "" });

  const [open2, setOpen2] = useState(false);
  const [flightnumber, setFlightnumber] = React.useState(0);

  const [deptime, setdeptime] = React.useState("");
  const [depdate, setdepdate] = React.useState("");
  const [depairport, setdepairport] = React.useState("");

  const [arrtime, setarrtime] = React.useState("");
  const [arrdate, setarrdate] = React.useState("");
  const [arrairport, setarrairport] = React.useState("");

  const [econ, setecon] = React.useState(0);
  const [buis, setbuis] = React.useState(0);

  const [error, seterror] = useState("");
  const [message, setmessage] = useState("");
  const [open3, setOpen3] = useState(false);
  const [flightnumberdelete, setflightnumberdelete] = useState(0);

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose2agree = () => {
    setOpen3(false);

    axios
      .post("http://localhost:8000/flights/deleteFlight", {
        FlightNumber: flightnumberdelete,
      })
      .then(function (response) {
        console.log(response);
        setmessage("success");
        console.log(response);
        seterror("Flight is updated");
        handleOpen2();
      });
    handleClose2();
  };

  const handleOpen2 = () => {
    setOpen1(true);
  };
  const handleClose2 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen2(true);
  };

  const handleClose1 = () => {
    setOpen2(false);
  };

  function validateDate(isoDate) {
    if (isNaN(Date.parse(isoDate))) {
      return false;
    } else {
      if (isoDate != new Date(isoDate).toISOString().substr(0, 10)) {
        return false;
      }
    }
    return true;
  }

  function validateHhMm(inputField) {
    var isValid = /^([0-1][0-9]|2[0-3]):([0-5][0-9])?$/.test(inputField.value);

    return isValid;
  }

  const handleClose1agree = () => {
    setmessage("error");
    var x = 9;
    if (flightnumber === "") {
      seterror("Fields cannot be left empty");
      handleOpen2();
    } else if (!/^\d+$/.test(flightnumber)) {
      handleOpen2();
      seterror("Flight number should only contain numbers ");
    } else {
      x--;
    }
    if (depairport === "") {
      seterror("Fields cannot be left empty");

      handleOpen2();
    } else if (/^\d+$/.test(depairport)) {
      handleOpen2();
      seterror("Departure Airport should be of type string ");
    } else {
      x--;
    }

    if (arrairport === "") {
      seterror("Fields cannot be left empty");

      handleOpen2();
    } else if (/^\d+$/.test(arrairport)) {
      handleOpen2();
      seterror("Arrival Airport should be of type string ");
    } else {
      x--;
    }

    if (buis === "") {
      seterror("Fields cannot be left empty");

      handleOpen2();
    } else if (!(buis.match(/^[0-9]+$/) != null)) {
      handleOpen2();
      seterror("Buisness seats should only contain numbers ");
    } else {
      x--;
    }

    if (econ === "") {
      seterror("Fields cannot be left empty");

      handleOpen2();
    } else if (!(econ.match(/^[0-9]+$/) != null)) {
      handleOpen2();
      seterror("Economy seats should only contain numbers ");
    } else {
      x--;
    }

    if (arrdate === "") {
      seterror("Fields cannot be left empty");

      handleOpen2();
    } else if (!validateDate(arrdate)) {
      handleOpen2();
      seterror("Arrival Date should be in 'yy-mm-dd' format ");
    } else if (new Date(arrdate) < new Date()) {
      handleOpen2();
      seterror("Arrival Date should be greater than today's date ");
    } else if (new Date(arrdate) < new Date(depdate)) {
      if (new Date(arrdate) === new Date(depdate)) {
      } else {
        handleOpen2();
        seterror(
          "Arrival Date should be greater than  or equal Deaprture date "
        );
      }
    } else {
      x--;
    }

    if (depdate === "") {
      seterror("Fields cannot be left empty");

      handleOpen2();
    } else if (!validateDate(depdate)) {
      handleOpen2();
      seterror("Departure Date should be in 'yy-mm-dd' format ");
    } else if (new Date(depdate) < new Date()) {
      handleOpen2();
      seterror("Departure Date should be greater than or equal today's date ");
    } else {
      x--;
    }

    if (arrtime === "") {
      seterror("Fields cannot be left empty");

      handleOpen2();
    } else if (!(arrtime >= "00:00" && arrtime <= "23:59")) {
      console.log("16:00" > "00:00");

      handleOpen2();
      seterror("Arrival Time should be in 'hh:mm' format ");
    } else {
      x--;
    }

    if (deptime === "") {
      seterror("Fields cannot be left empty");

      handleOpen2();
    } else if (!(deptime >= "00:00" && deptime <= "23:59")) {
      console.log("16:00" > "00:00");

      handleOpen2();
      seterror("Departure Time should be in 'hh:mm' format ");
    } else {
      x--;
    }
    if (x === 0) {
      axios
        .post("http://localhost:8000/flights/updateFlight", {
          FlightNumber: flightnumber,
          DepartureDate: depdate,
          ArrivalDate: arrdate,
          EconomySeats: econ,
          BusinessSeats: buis,
          ArrivalAirport: arrairport,

          DepartureAirport: depairport,
          DepartureTime: deptime,
          ArrivalTime: arrtime,
        })
        .then(function (response) {
          setmessage("success");
          console.log(response);
          seterror("Flight is updated");
          handleOpen2();
        });
      handleClose1();
      handleClose2();

      navigate("/homeadmin");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={classes.list}>
        {flights.map((n) => (
          <div>
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
                TripDuration: n.TripDuration,
                BaggageAllowance: n.BaggageAllowance ? n.BaggageAllowance : "",
              }}
              setPopup={setPopup}
              setOpen={setOpen1}
            />
            <div className={classes.display}>
              <div className={classes.edit}>
                <IconButton size="small">
                  <EditIcon
                    onClick={() => {
                      console.log(n, "alllllll");

                      handleOpen1();
                      setFlightnumber(n.FlightNumber);
                      window.localStorage.setItem("buisseats", n.BusinessSeats);
                      window.localStorage.setItem("econseat", n.EconomySeats);

                      window.localStorage.setItem(
                        "flightnumber",
                        n.FlightNumber
                      );
                      window.localStorage.setItem(
                        "departureairport",
                        n.DepartureAirport
                      );
                      window.localStorage.setItem(
                        "departureTime",
                        n.DepartureTime
                      );
                      window.localStorage.setItem(
                        "departureDate",
                        n.DepartureDate
                      );
                      window.localStorage.setItem(
                        "arivalairport",
                        n.ArrivalAirport
                      );
                      window.localStorage.setItem("arrivaltime", n.ArrivalTime);
                      window.localStorage.setItem("arrivalDate", n.ArrivalDate);
                    }}
                  />
                </IconButton>
              </div>
              <div className={classes.delete}>
                <IconButton size="small">
                  <DeleteIcon
                    onClick={() => {
                      setflightnumberdelete(n.FlightNumber);
                      handleOpen3();
                    }}
                  />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PopUp
        open={open2}
        handleOpen={handleOpen1}
        handleClose={handleClose1}
        handleOpenagree={handleClose1agree}
        setOpen={setOpen1}
        flightnumber={flightnumber}
        setdeptime={setdeptime}
        setdepairport={setdepairport}
        setdepdate={setdepdate}
        setarrtime={setarrtime}
        setarrdate={setarrdate}
        setarrairport={setarrairport}
        setecon={setecon}
        setbuis={setbuis}
        flightnumber={setFlightnumber}
      />

      <SnackBar
        open={open1}
        handleOpen={handleOpen2}
        handleClose={handleClose2}
        error={error}
        severity={message}
      />

      <PopupDelete
        open={open3}
        handleOpen={handleOpen3}
        handleOpenagree={handleClose2agree}
        handleClose={handleClose3}
        className={classes.popup}
        error="Are you sure you want to delete ?"
        firstbutton="Agree"
        secondbutton="Disagree"
      />
    </div>
  );
}
