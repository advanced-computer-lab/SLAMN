import React from "react";
import TextBox from "../Componenets/General/TextBox";
import axios from "axios";
import Button from "../Componenets/General/BasicButton";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SnackBar from "../Componenets/General/SnackBar";
import NavBar from "../Componenets/General/NavBar2";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import Avatar from "@material-ui/core/Avatar";

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
    //top: "3vw",
    border: "1px solid grey",
    borderRadius: " 0.7vw",
    width: "40vw",
    textAlign: "center",
  },
  updatebutton: {
    width: "42vw",
    heigth: "1vw",
    textAlign: "-webkit-center",
    marginTop: "2vw",
    marginLeft: "28.5vw",
    marginBottom: "3vw",
  },
  title: {
    textAlign: "center",
    width: "30vw",
    height: "5vw",
    fontSize: "2vw",
    // border: "1px solid grey",
    borderRadius: " 1.3vw",
    position: "relative",
    // top: "1vw",
    color: "Black",
    textAlign: "center",
    lineHeight: "4vw",
    margin: "auto",
  },
  severalboxes: {
    display: "flex",
  },
  avatar: {
    //margin: theme.spacing(1),
    backgroundColor: "#005dad",
    marginTop: "2vw",
    marginLeft: "48vw",
    width: "3vw",
    height: "3vw",
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
  const [baggage, setBaggage] = React.useState(-1);
  const [open1, setOpen1] = useState(false);
  const [error, seterror] = useState("");
  const handleOpen1 = () => {
    setOpen1(true);
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
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClick = async () => {
    var x = 13;
    if (FlightNumber === "") {
      seterror("Fields cannot be left empty");
      handleOpen1();
    } else if (!/^\d+$/.test(FlightNumber)) {
      handleOpen1();
      seterror("Flight number should only contain numbers ");
    } else {
      x--;
    }
    if (baggage === "") {
      seterror("Fields cannot be left empty");
      handleOpen1();
    } else if (!/^\d+$/.test(baggage)) {
      handleOpen1();
      seterror("Baggage number should only contain numbers ");
    } else {
      x--;
    }
    if (BusinessSeats === "") {
      seterror("Fields cannot be left empty");
      handleOpen1();
    } else if (!/^\d+$/.test(BusinessSeats)) {
      handleOpen1();
      seterror("Buisness seats should only contain numbers ");
    } else {
      x--;
    }
    if (EconomySeats === "") {
      seterror("Fields cannot be left empty");
      handleOpen1();
    } else if (!/^\d+$/.test(EconomySeats)) {
      handleOpen1();
      seterror("Economy seats should only contain numbers ");
    } else {
      x--;
    }
    if (FirstClassSeats === "") {
      seterror("Fields cannot be left empty");
      handleOpen1();
    } else if (!/^\d+$/.test(FirstClassSeats)) {
      handleOpen1();
      seterror("First Class seats should only contain numbers ");
    } else {
      x--;
    }
    if (ArrivalDate === "") {
      seterror("Fields cannot be left empty");

      handleOpen1();
    } else if (!validateDate(ArrivalDate)) {
      handleOpen1();
      seterror("Arrival Date should be in 'yy-mm-dd' format ");
    } else if (new Date(ArrivalDate) < new Date()) {
      handleOpen1();
      seterror("Arrival Date should be greater than today's date ");
    } else if (new Date(ArrivalDate) < new Date(DepartureDate)) {
      if (new Date(ArrivalDate) === new Date(DepartureDate)) {
      } else {
        handleOpen1();
        seterror(
          "Arrival Date should be greater than or equal Deaprture date "
        );
      }
    } else {
      x--;
    }
    if (DepartureDate === "") {
      seterror("Fields cannot be left empty");

      handleOpen1();
    } else if (!validateDate(DepartureDate)) {
      handleOpen1();
      seterror("Departure Date should be in 'yy-mm-dd' format ");
    } else if (new Date(DepartureDate) < new Date()) {
      handleOpen1();
      seterror("Departure Date should be greater than or equal today's date ");
    } else {
      x--;
    }
    if (Price === "") {
      seterror("Fields cannot be left empty");
      handleOpen1();
    } else if (!/^\d+$/.test(Price)) {
      handleOpen1();
      seterror("Price should only contain numbers ");
    } else {
      x--;
    }
    if (TripDuration === "") {
      seterror("Fields cannot be left empty");
      handleOpen1();
    } else if (!/^\d+$/.test(TripDuration)) {
      handleOpen1();
      seterror("Trip Duration should only contain numbers ");
    } else {
      x--;
    }
    if (Arrairport === "") {
      seterror("Fields cannot be left empty");

      handleOpen1();
    } else if (/^\d+$/.test(Arrairport)) {
      handleOpen1();
      seterror("Arrival Airport should be of type string ");
    } else {
      x--;
    }
    if (depariport === "") {
      seterror("Fields cannot be left empty");

      handleOpen1();
    } else if (/^\d+$/.test(depariport)) {
      handleOpen1();
      seterror("Departure Airport should be of type string ");
    } else {
      x--;
    }

    if (arrivaltime === "") {
      seterror("Fields cannot be left empty");

      handleOpen1();
    } else if (!(arrivaltime >= "00:00" && arrivaltime <= "23:59")) {
      console.log("16:00" > "00:00");

      handleOpen1();
      seterror("Arrival Time should be in 'hh:mm' format ");
    } else {
      x--;
    }
    if (deptime === "") {
      seterror("Fields cannot be left empty");

      handleOpen1();
    } else if (!(deptime >= "00:00" && deptime <= "23:59")) {
      console.log("16:00" > "00:00");

      handleOpen1();
      seterror("Arrival Time should be in 'hh:mm' format ");
    } else {
      x--;
    }

    if (x === 0) {
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
            BaggageAllowance: baggage,
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
      <Avatar className={classes.avatar}>
        <FlightOutlinedIcon style={{ color: "#ffd633", fontSize: "2vw" }} />
      </Avatar>
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
            title={"BaggageAllowance"}
            onChange={(e) => {
              setBaggage(e.target.value);
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
        <Button title="Create" onClick={handleClick} fullWidth="true" />
      </div>

      <SnackBar
        open={open1}
        handleOpen={handleOpen1}
        handleClose={handleClose1}
        error={error}
        severity="error"
      />
    </div>
  );
}
