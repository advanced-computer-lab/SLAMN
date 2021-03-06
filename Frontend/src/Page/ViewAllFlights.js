import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextBox from "../Componenets/General/TextBox";
// import PopUp from "../Componenets/General/UpdatePopUp";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import Popup from "../Componenets/General/PopUp";
import PopUp from "../Componenets/UpdateFlight/PopUp";
import Buttons from "../Componenets/General/Buttons";
import PopupDelete from "../Componenets/General/PopUp";
// import { set } from "mongoose";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  listDiv: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: "-15vw !important",
  },
  textbox: {},
  textboxDiv: {
    marginLeft: "5vw !important",
    marginTop: "2vw !important",
  },
  note: {
    fontSize: "1vw",
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
  const [ArrivalAirport, setArrivalAirport] = useState("");
  const [DepartureAirport, setDepartureAirpot] = useState("");

  const [FlightNumberUp, setFlightNumberUp] = useState("");
  const [BusinessSeatsUp, setBusinessSeatsUp] = useState("");
  const [EconomySeatsUp, setEconomySeatsUp] = useState("");
  const [DepartureDateUp, setDepartureDateUp] = useState("");
  const [ArrivalDateUp, setArrivalDateUp] = useState("");
  const [DepartureTimeUp, setDepartureTime] = useState("");
  const [ArrivalTimeUp, setArrivalTime] = useState("");
  const [departureAirportUp, setDepartureAirportUp] = useState("");
  const [arrivalAirportUp, setArrivalAirportUp] = useState("");
  const [filter, setFilter] = useState({});
  const [open1, setOpen1] = useState(false);
  const [change, setChange] = useState(false);
  const [flightnumberdelete, setFlightnumberdelete] = useState(0);

  const [FlightNumberPopUp, setFlightNumberPopUp] = useState("");
  const [BusinessSeatsPopUp, setBusinessSeatsPopUp] = useState("");
  const [EconomySeatsPopUp, setEconomySeatsPopUp] = useState("");
  const [DepartureDatePopUp, setDepartureDatePopUp] = useState("");
  const [ArrivalDatePopUp, setArrivalDatePopUp] = useState("");
  const [DepartureTimePopUp, setDepartureTimePopUp] = useState("");
  const [ArrivalTimePopUp, setArrivalTimePopUp] = useState("");
  const [departureAirportPopUp, setDepartureAirportPopUp] = useState("");
  const [arrivalAirportPopUp, setArrivalAirportPopUp] = useState("");

  const [update, setUpdate] = useState(false);

  const [del, setDelete] = useState(false);

  const [test, setTest] = useState([1, 2, 3, 4, 5]);
  const classes = useStyles();
  const [open2, setOpen2] = useState(false);

  const handleClickPopUpDelete = () => {
    setOpen2(true);
    console.log(flightnumberdelete, "noooooooo");
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose2agree = (number) => {
    setOpen2(false);
    setDelete(!del);
    axios
      .post("http://localhost:8000/flights/deleteFlight", {
        FlightNumber: flightnumberdelete,
      })
      .then(function (response) {
        console.log(response);
      });
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose1agree = () => {
    setOpen1(false);
    console.log("update");
    setUpdate(!update);

    axios
      .post("http://localhost:8000/flights/updateFlight", {
        FlightNumber: FlightNumberUp,
        DepartureDate: DepartureDateUp,
        ArrivalDate: ArrivalDateUp,
        EconomySeats: EconomySeatsUp,
        BusinessSeats: BusinessSeatsUp,
        ArrivalAirport: arrivalAirportUp,

        DepartureAirport: departureAirportUp,
        DepartureTime: DepartureTimeUp,
        ArrivalTime: ArrivalTimeUp,
      })
      .then(function (response) {
        console.log(response);
      });
  };

  useEffect(() => {
    console.log(flightnumberdelete, "noooooooooooooo");
    axios
      .post("http://localhost:8000/flights/getflights", {}, {})
      .then((res) => {
        console.log(res.data.data);
        setFlights(res.data.data);
        setFlightNumberPopUp(res.data.data[0].FlightNumber);
        console.log(res.data.data, "dataaaaaaaaaaaaaaaaa");
      });
  }, [reset, del, update, flightnumberdelete]);

  const handleChange = (prop) => (event) => {
    // setFilter(Object.assign({ filter, FlightNumber }));
    // console.log(filter.filter);

    if (prop === "FlightNumber") setFlightNumber(event.target.value);
    if (prop === "EconomySeats") setEconomySeats(event.target.value);
    if (prop === "BusinessSeats") setBusinessSeats(event.target.value);
    if (prop === "DepartureDate") setDepartureDate(event.target.value);
    if (prop === "ArrivalDate") setArrivalDate(event.target.value);
    if (prop === "ArrivalAirport") setArrivalAirport(event.target.value);
    if (prop === "DepartureAirport") setDepartureAirpot(event.target.value);
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
    if (ArrivalAirport.length !== 0) obj.ArrivalAirport = ArrivalAirport;
    if (DepartureAirport.length !== 0) obj.DepartureAirport = DepartureAirport;
    console.log(obj);
    axios
      .post("http://localhost:8000/flights/searchflight", obj, {})
      .then((res) => {
        console.log(res);
        setFlights(res.data.data);
        setArrivalAirportPopUp(res.data.data[0].ArrivalAirport);
        setArrivalDatePopUp(res.data.data[0].ArrivalDate);
        setBusinessSeatsPopUp(res.data.data[0].BusinessSeats);
        setDepartureAirportPopUp(res.data.data[0].DepartureAirport);
        setDepartureDatePopUp(res.data.data[0].DepartureDate);
        setEconomySeatsPopUp(res.data.data[0].EconomySeats);
        setFlightNumberPopUp(res.data.data[0].FlightNumber);
        // setArrivalTimePopUp(res.data.data[0].ArrivalDate.getTime());
        // setDepartureTimePopUp(res.data.data[0].DepartureDate.getTime());

        console.log(flights, "fffffffffffffffffffffff");
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
      <div className={classes.textboxDiv}>
        <h1 className={classes.note}>
          NOTE:Make sure to use capital letter for the initials of days,months
          and cities.
        </h1>
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
        <TextBox
          title={"Arrival Airport"}
          onChange={handleChange("ArrivalAirport")}
        />
        <TextBox
          title={"Departure Airport"}
          onChange={handleChange("DepartureAirport")}
        />
        <Button onClick={handleClick} variant="outlined">
          Search
        </Button>
        <Button onClick={handleClick2} color="error" variant="outlined">
          Remove Filter
        </Button>
      </div>
      <div className={classes.listDiv}>
        {flights.map((elem) => (
          <>
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
                  elem.ArrivalDate +
                  "    " +
                  "Arrival Airport:" +
                  elem.ArrivalAirport +
                  "    " +
                  "Departure Airport:" +
                  elem.DepartureAirport
                }
              />
              <IconButton size="small">
                <EditIcon
                  onClick={() => {
                    setFlightnumberdelete(elem.FlightNumber);
                    handleOpen1();
                  }}
                />
              </IconButton>
              <IconButton size="small">
                <DeleteIcon
                  onClick={() => {
                    setFlightnumberdelete(elem.FlightNumber);
                    handleClickPopUpDelete();
                  }}
                />
              </IconButton>
            </ListItem>
          </>
        ))}
      </div>{" "}
      {/* <Popup
        open={open1}
        handleOpen={handleOpen1}
        handleOpenagree={handleClose1agree}
        handleClose={handleClose1}
        className={classes.popup}
        error="Are you sure you want to update ?"
        firstbutton="Agree"
        secondbutton="Disagree"
      /> */}
      <PopUp
        open={open1}
        handleOpen={handleOpen1}
        handleClose={handleClose1}
        handleOpenagree={handleClose1agree}
        setOpen={setOpen1}
        flightnumber={setFlightNumberUp}
        buisseats={setBusinessSeatsUp}
        econseast={setEconomySeatsUp}
        deptime={setDepartureTime}
        arrivaltime={setArrivalTime}
        depdate={setDepartureDateUp}
        arrivaldate={setArrivalDateUp}
        arrivalairport={setArrivalAirportUp}
        departureairport={setDepartureAirportUp}
        // arrivalAirport={arrivalAirportPopUp}
        // arrivalDate={ArrivalDatePopUp}
        flightno={FlightNumberPopUp}
        // buisSeat={BusinessSeatsPopUp}
        // depAirport={departureAirportPopUp}
        // econSeat={EconomySeatsPopUp}
        // depdate={DepartureDatePopUp}
        // deptime={DepartureTimePopUp}
        // arrivaltime={ArrivalTimePopUp}
      />
      <PopupDelete
        open={open2}
        handleOpen={handleOpen2}
        handleOpenagree={handleClose2agree}
        handleClose={handleClose2}
        className={classes.popup}
        error="Are you sure you want to delete ?"
        firstbutton="Agree"
        secondbutton="Disagree"
      />
    </div>
  );
}
