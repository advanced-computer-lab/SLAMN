import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Divider from "@mui/material/Divider";
import Button from "../AccountDetails/Buttons";
import { useNavigate } from "react-router-dom";
import UserInfo from "../Seats/SeatReservationinfo";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    marginTop: "3vw",
    marginLeft: "20vw",
    backgroundColor: "white",
    width: "50vw",
    height: "23vw",
    padding: "0.5vw",
    borderRadius: "0.5vw !important",
    boxShadow: "1px 1.6px 1px #9E9E9E",
  },
  duration: {
    fontSize: "1vw",
    color: "gray",
    fontWeight: "500",
    marginTop: "0.5vw",
  },

  block: {
    width: "51vw",
    marginLeft: "-0.5vw",
    height: "0.2vw",
    backgroundColor: "#ffd633 !important",
    borderRadius: "0.5vw !important",
    marginTop: "-0.5vw",
  },
  display: {
    display: "flex",
  },
  flight: {
    color: "#aaa",
    marginTop: "1vw",
    fontSize: "1.5vw",
    marginLeft: "1vw",
  },

  dep: {
    fontSize: "0.9vw",
    marginTop: "0.5vw",
    marginLeft: "0.5vw",
    fontWeight: "600",
  },
  depicon: { marginTop: "0.5vw", marginLeft: "1vw" },
  tim1dep: {
    fontWeight: "600",
    marginTop: "0.5vw",
    fontSize: "1.5vw",
    marginLeft: "1vw",
  },
  tim1arrival: {
    fontWeight: "600",
    marginTop: "0.5vw",
    fontSize: "1.5vw",
    marginLeft: "1vw",
  },
  count1dep: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "0.5vw",
    fontSize: "1.5vw",
  },
  count1arrival: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "0.5vw",
    fontSize: "1.5vw",
  },
  tim2dep: {
    fontWeight: "600",
    marginTop: "0.2vw",
    marginLeft: "20vw",
    fontSize: "1.5vw",
  },
  tim2arrival: {
    fontWeight: "600",
    marginTop: "0.3vw",
    marginLeft: "20vw",
    fontSize: "1.5vw",
  },
  count2dep: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "0.2vw",
    fontSize: "1.5vw",
  },
  count2arrival: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "0.4vw",
    fontSize: "1.5vw",
  },
  dep1info: {
    color: "#666",
    fontSize: "0.9vw",
    marginLeft: "1vw",
    fontWeight: "600",
  },
  arrival1info: {
    color: "#666",
    fontSize: "0.9vw",
    marginLeft: "1vw",
  },

  dep12info: {
    color: "#666",
    fontSize: "0.9vw",
    marginLeft: "20vw",
    fontWeight: "600",
  },

  arrival12info: {
    color: "#666",
    fontSize: "0.9vw",
    marginLeft: "20vw",
  },

  divider: {
    marginTop: "-0.2vw !important",
    height: "2vw !important",
    fontWeight: "100 !important",
  },

  arrival: {
    fontSize: "0.9vw",
    marginTop: "0.5vw",
    marginLeft: "0.5vw",
    fontWeight: "600",
  },
  arrivalicon: { marginTop: "0.5vw", marginLeft: "1vw" },

  priceandselect: {
    display: "flex",
    width: "50vw",
    justifyContent: "space-between",
  },
  price: {
    fontWeight: "600",
    fontSize: "1.3vw",
  },
  price2: {
    marginLeft: "-0.2vw",
    marginTop: "0.5vw",
    color: "gray",
    fontSize: "1vw",
    fontWeight: "500",
  },
  baggage: {
    fontSize: "1.1vw",
    fontWeight: "600",
    marginTop: "0.7vw",
  },
  baggageallowance: {
    fontWeight: "500",
    fontSize: "1vw",
    color: "gray",
    fontWeight: "600",
    marginTop: "0.5vw",
    marginLeft: "-0.1vw",
  },
  button: {
    width: "15vw",
    height: "0.5vw",
    borderRadius: "50%",
    color: "black",
    marginLeft: "35vw",
    marginTop: "1.5vw",
  },
});

export default function Card(props) {
  const classes = useStyles();
  const returnParameters = JSON.parse(localStorage.getItem("returnParameters"));
  const [reservation, setReservation] = useContext(UserInfo);
  const logged = window.localStorage.getItem("logged");
  const history = useNavigate();

  const handleClick = async () => {
    if (logged === "false") {
      history("/sigin");
    } else {
      if (!returnParameters.isReturn) {
        console.log(returnParameters, "lISTTTTT");
        if (props.flight.passengers === "") {
          props.setPopup({
            message: "To select this flight please select passengers",
            severity: "error",
          });
          props.setOpen(true);
        } else {
          console.log(props.flight.Cabin, "Cabinnnn");
          if (props.flight.Cabin === "") {
            props.setPopup({
              message: "To select this flight please select a cabin type",
              severity: "error",
            });
            props.setOpen(true);
          } else {
            await axios
              .post(
                "http://localhost:8000/users/viewAvailableSeats",

                {
                  FlightNumber: "" + props.flight.FlightNumber,
                  Cabin: props.flight.Cabin,
                },
                { headers: { auth: window.localStorage.getItem("token") } }
              )
              .then(function (response) {
                console.log(response, "MY SEATSS");
                if (response.data.seats) {
                  {
                    var i = 1;
                    var a = [];
                    var newArray = [];
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
                    console.log(newArray);
                    localStorage.setItem("seats", JSON.stringify(newArray));
                  }
                }
              });

            setReservation({
              Cabin: props.flight.Cabin,
              FlightNumber: props.flight.FlightNumber,
              passengerslist: props.flight.passengerslist,
              price: props.flight.Price,
              DepartureAirport: props.flight.DepartureAirport,
              ArrivalAirport: props.flight.ArrivalAirport,
            });

            history("/bookflight");
          }
        }
      } else {
        {
          if (returnParameters.Cabin === "") {
            props.setPopup({
              message: "To select this flight please select a cabin type",
              severity: "error",
            });
            props.setOpen(true);
          } else {
            await axios
              .post(
                "http://localhost:8000/users/viewAvailableSeats",

                {
                  FlightNumber: "" + props.flight.FlightNumber,
                  Cabin: props.flight.Cabin,
                },
                { headers: { auth: window.localStorage.getItem("token") } }
              )
              .then(function (response) {
                console.log(response);
                if (response.data.seats.length != 0) {
                  console.log("MSH FADYY");
                  {
                    var i = 1;
                    var a = [];
                    var newArray = [];
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
                    console.log(newArray);
                    localStorage.setItem("seats", JSON.stringify(newArray));

                    localStorage.setItem(
                      "returnParameters",
                      JSON.stringify({
                        Cabin: props.flight.Cabin,
                        returnPassengersList:
                          returnParameters.returnPassengersList,
                        DeparturePassengersList:
                          returnParameters.DeparturePassengersList,
                        passengersNumber: returnParameters.passengersNumber,
                        returnPrice: returnParameters.returnPrice,
                        departurePrice: returnParameters.departurePrice,
                        DepartureAirport: returnParameters.DepartureAirport,
                        ArrivalAirport: returnParameters.ArrivalAirport,
                        isReturn: returnParameters.isReturn,
                        departureCabin: returnParameters.departureCabin,
                        DepartureFlightNumber:
                          returnParameters.DepartureFlightNumber,
                        ReturnFlightNumber: props.flight.FlightNumber,
                      })
                    );
                  }
                }
              });

            setReservation({
              Cabin: props.flight.Cabin,
              FlightNumber: props.flight.FlightNumber,
              passengerslist: props.flight.passengerslist,
              price: props.flight.Price,
              DepartureAirport: props.flight.DepartureAirport,
              ArrivalAirport: props.flight.ArrivalAirport,
            });

            history("/bookflight");
          }
        }
      }
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.block}></div>
      <div className={classes.flight}>Flight {props.flight.FlightNumber}</div>
      <div className={classes.display}>
        <FlightTakeoffIcon
          className={classes.depicon}
          style={{ color: "#005dad" }}
        />
        <div className={classes.dep}>Departure</div>
      </div>
      <div className={classes.display}>
        <div>
          <div className={classes.display}>
            <div className={classes.tim1dep}>{props.flight.DepartureTime}</div>
            <div className={classes.count1dep}>
              {" "}
              {props.flight.DepartureAirport}
            </div>
          </div>

          <div className={classes.dep1info}>{props.flight.DepartureDate}</div>
        </div>

        <div>
          <div className={classes.display}>
            <div className={classes.tim2dep}>{props.flight.ArrivalTime}</div>
            <div className={classes.count2dep}>
              {" "}
              {props.flight.ArrivalAirport}
            </div>
          </div>
          <div className={classes.dep12info}>{props.flight.ArrivalDate}</div>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.priceandselect}>
        <div className={classes.count2dep}>
          <div className={classes.price}>Price:</div>
          <div className={classes.price2}>{props.flight.Price + "EGP"}</div>
        </div>
        <div>
          <div className={classes.baggage}>{"BaggageAllownce: "}</div>
          <div className={classes.baggageallowance}>
            {props.flight.BaggageAllowance + "kg"}
          </div>
        </div>
        <div>
          <div className={classes.baggage}>TripDuration:</div>
          <div className={classes.duration}>{props.flight.TripDuration}</div>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.button}>
        <Button
          fullWidth="true"
          title={"Select "}
          onClick={handleClick}
          style={{ borderRadius: "2vw", backgroundColor: "rgb(0, 93, 173)" }}
        />
      </div>
    </div>
  );
}
