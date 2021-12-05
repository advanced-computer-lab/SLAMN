import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import SeatPicker from "../Componenets/Seats/SeatPicker";
import axios from "axios";
import Line from "../Images/arrowRight.png";
import Line1 from "../Images/Line.png";
import Passenger from "../Componenets/Seats/Passenger";
import UserInfo from "../Componenets/Seats/SeatReservationinfo";
const useStyles = makeStyles(() => ({
  root: {
    width: "60vw",
    height: "40vw",
    backgroundColor: "whitesmoke",
    marginLeft: "15vw",
    marginTop: "3vw",
  },
  differentSeats: {
    width: "30vw",
    marginLeft: "2vw",
    background: "#fff",
    border: " 1px solid #ccc",
    borderRadius: "0.3vw",
  },
  title: {
    width: "60vw",
    textAlign: "center",
    height: "5vw",
    textAlign: "center",
    fontSize: " 1.7vw",
    fontWeight: "500",
    paddingTop: "2vw",
  },
  seats: {
    display: "flex",
  },
  seatpicker: {
    width: "30vw !important",
    height: "20vw",
    marginTop: "2vw",
    textAlign: " -webkit-center",
  },
  flights: {
    width: "60vw",
    display: "flex",
    placeContent: "space-evenly",
    justifyContent: "center",
  },
  Line: {
    width: "6vw",
    height: "2vw",
    marginLeft: "2vw",
    marginRight: "2vw",
  },
  Line1: {
    width: "50vw",
    height: "0.1vw",
    marginLeft: "5vw",
  },
  bigdiv: {
    display: "flex",
    width: "60vw",
  },
  passengers: {
    width: "30vw",
    height: "20vw",
    marginLeft: "2vw",
    marginTop: "2vw",
    background: "#fff",
    border: " 1px solid #ccc",
    borderRadius: "0.3vw",
    marginBottom: "1vw",
    overflowY: "scroll",
  },
  departure: {
    width: "10vw",
    fontSize: "1.3vw",
    fontWeight: "500",
  },
  deparr: {
    width: "10vw",
    marginTop: "0.5vw",
    marginBottom: "1vw",
    textAlign: "center",
  },
  pricediv: {
    width: "20vw",
    background: "#fff",
    border: " 1px solid #ccc",
    borderRadius: "0.3vw",
    textAlign: "left",
  },
  total: {
    marginLeft: "1vw",
    fontSize: "1.3vw",
    fontWeight: "500",
  },
  price: {
    marginLeft: "1.5vw",
    fontSize: "1vw",
  },
  available: {
    color: "#4FC3F7",
  },
  occupied: {
    color: "#E0E0E0",
  },
  chosen: {
    color: "#4CAF50",
  },
}));

export default function ViewAvailableSeats(props) {
  const classes = useStyles();
  const [reservation, setReservation] = useContext(UserInfo);
  const [cabin, setCabin] = React.useState(reservation.Cabin);
  const [price, setPrice] = React.useState(reservation.price);
  const [passengers, setPassengers] = React.useState(
    reservation.passengerslist
  );
  const [seatsNumber, setSeatsnumber] = React.useState(
    reservation.passengerslist.length
  );
  const [seatsArray, setSeatsArray] = React.useState([]);
  var array = [];
  useEffect(() => {
    console.log(reservation);
    axios
      .post(
        "http://localhost:8000/users/viewAvailableSeats",

        {
          FlightNumber: "" + reservation.FlightNumber,
          Cabin: reservation.Cabin,
        },
        { headers: { auth: window.localStorage.getItem("token") } }
      )
      .then(function (response) {
        console.log(response);
        setSeatsArray(response.data.seats);
        {
          if (response.data.seats.length != 0) {
            console.log("MSH FADYY");
            {
              var i = 1;
              var newArray = [];
              var a = [];
              for (i; i <= response.data.seats.length; i++) {
                if (i % 6 === 0) {
                  a.push({
                    number: response.data.seats[i - 1].number,
                    isReserved: response.data.seats[i - 1].isReserved,
                  });
                  newArray.push(a);
                  a = [];
                } else {
                  a.push({
                    number: response.data.seats[i - 1].number,
                    isReserved: response.data.seats[i - 1].isReserved,
                  });
                }
              }
              if ((i - 1) % 6 != 0) {
                newArray.push(a);
              }
              array = newArray;
              console.log(array);
            }
          }
        }
      });
  }, []);

  const createArray = () => {
    if (seatsArray.length != 0) {
      console.log("MSH FADYY");
      {
        var i = 0;
        var newArray = [];
        var a = [];
        for (i; i < seatsArray.length; i++) {
          if ((i + 1) % 6 === 0) {
            a.push(seatsArray[i]);
            newArray.push(a);
            a = [];
          }
          a.push(seatsArray[i]);
        }
        if (a != []) {
          newArray.push(a);
        }
        array = newArray;
        console.log(newArray);
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>SEAT RESERVATION</div>
      <div className={classes.flights}>
        <div>{reservation.DepartureAirport}</div>
        <img src={Line} className={classes.Line} />
        <div>{reservation.ArrivalAirport}</div>
      </div>
      <img src={Line1} className={classes.Line1} />
      <div className={classes.bigdiv}>
        <div>
          <div className={classes.passengers}>
            <div className={classes.departure}>Departure Flight:</div>
            <div className={classes.deparr}>
              {reservation.DepartureAirport +
                " - " +
                reservation.ArrivalAirport}
            </div>
            {passengers.map((d) => (
              <Passenger
                passengerNumber={d.passengerNumber}
                passengerType={d.passengerType}
                passengerSeat={d.passengerSeat}
              />
            ))}
          </div>
          <div className={classes.differentSeats}>
            <div className={classes.seats}>
              <AirlineSeatReclineNormalIcon className={classes.available} />
              <div> Available</div>
            </div>
            <div className={classes.seats}>
              <AirlineSeatReclineNormalIcon className={classes.occupied} />
              <div> Occupied</div>
            </div>
            <div className={classes.seats}>
              <AirlineSeatReclineNormalIcon className={classes.chosen} />
              <div> Chosen</div>
            </div>
          </div>
        </div>
        <div className={classes.seatpicker}>
          <SeatPicker
            seatsnumber={seatsNumber}
            setSeats={setPassengers}
            seats={passengers}
            array={array}
          />
          <div className={classes.pricediv}>
            <div className={classes.total}>Total Price:</div>
            <div className={classes.price}>{price}EGP</div>
          </div>
        </div>
      </div>
    </div>
  );
}
