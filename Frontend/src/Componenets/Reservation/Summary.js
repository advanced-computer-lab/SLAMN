import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Divider from "@mui/material/Divider";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import axios from "axios";
import NavBar from "../General/NavBar";
import Buttons from "../General/Buttons";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  root: {
    marginTop: "1vw",
    marginLeft: "2vw",
    backgroundColor: "white",
    width: "60vw",
    height: "32vw",
    padding: "0.5vw",
    borderRadius: "0.5vw !important",
    boxShadow: "1px 1.6px 1px #9E9E9E",
  },
  block: {
    width: "60.5vw",
    height: "0.2vw",
    backgroundColor: "#ffd633 !important",
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

  dep: { fontSize: "0.9vw", marginTop: "1.2vw", marginLeft: "0.5vw" },
  depicon: { marginTop: "1vw", marginLeft: "1vw" },
  tim1dep: {
    fontWeight: "600",
    marginTop: "1.5vw",
    fontSize: "1.5vw",
    marginLeft: "1vw",
  },
  tim1arrival: {
    fontWeight: "600",
    marginTop: "1.5vw",
    fontSize: "1.5vw",
    marginLeft: "1vw",
  },
  count1dep: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "1.5vw",
    fontSize: "1.5vw",
  },
  count1arrival: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "1.5vw",
    fontSize: "1.5vw",
  },
  tim2dep: {
    fontWeight: "600",
    marginTop: "1.3vw",
    marginLeft: "20vw",
    fontSize: "1.5vw",
  },
  tim2arrival: {
    fontWeight: "600",
    marginTop: "1.5vw",
    marginLeft: "20vw",
    fontSize: "1.5vw",
  },
  count2dep: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "1.5vw",
    fontSize: "1.3vw",
  },
  count2arrival: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "1.5vw",
    fontSize: "1.5vw",
  },
  dep1info: {
    color: "#666",
    fontSize: "0.9vw",
    marginLeft: "1vw",
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
  },

  arrival12info: {
    color: "#666",
    fontSize: "0.9vw",
    marginLeft: "20vw",
  },

  divider: {
    marginTop: "1.5vw !important",
    height: "2vw !important",
  },

  arrival: { fontSize: "0.9vw", marginTop: "1.2vw", marginLeft: "0.5vw" },
  arrivalicon: { marginTop: "1vw", marginLeft: "1vw" },
  depclass: {
    color: "#666",
    fontSize: "0.9vw",
    marginTop: "1.2vw",
    marginLeft: "45vw",
  },
  depprice: {
    color: "#666",
    fontSize: "0.9vw",
    //marginTop: "1.6vw",
    marginLeft: "52.6vw",
  },
  arrivalprice: {
    color: "#666",
    fontSize: "0.9vw",
    //marginTop: "1.6vw",
    marginLeft: "52.8vw",
  },
  arrivalclass: {
    color: "#666",
    fontSize: "0.9vw",
    marginTop: "1.2vw",
    marginLeft: "46.7vw",
  },
  ticketicon: { marginLeft: "54vw", marginTop: "0.4vw" },

  priceTotal: { fontWeight: "600", marginTop: "0.5vw", marginLeft: "50vw" },
});

export default function Summary() {
  const history = useNavigate();
  const departurelist = JSON.parse(localStorage.getItem("departureList"));
  const classes = useStyles();
  const [returnParameters, setParameters] = React.useState(
    JSON.parse(localStorage.getItem("returnParameters"))
  );

  const handleConfirm = () => {
    const summary = JSON.parse(localStorage.getItem("summaryDetails"));
    console.log(summary, "SD");
    axios
      .post(
        "http://localhost:8000/users/createReservation",

        {
          DepartureFlightNumber: returnParameters.DepartureFlightNumber,
          ArrivalFlightNumber: returnParameters.ArrivalFlightNumber,
          DepCabinClass: returnParameters.departureCabin,
          ArrCabinClass: summary.returnCabin,
          NumberOfPassengers: returnParameters.returnSeats.length,
        },
        { headers: { auth: window.localStorage.getItem("token") } }
      )
      .then(function (response) {
        console.log(response, "LLLL");
        history("/home");
      });
  };
  useEffect(() => {
    console.log(returnParameters, "el returnn", departurelist);
    axios
      .post(
        "http://localhost:8000/users/createSummary",

        {
          ArrivalFlightNumber: returnParameters.ReturnFlightNumber,
          DepartureFlightNumber: returnParameters.DepartureFlightNumber,
          returnSeats: returnParameters.returnPassengersList,
          departureSeats: departurelist,
          returnCabin: returnParameters.Cabin,
          departureCabin: returnParameters.departureCabin,
        },
        { headers: { auth: window.localStorage.getItem("token") } }
      )
      .then(function (response) {
        console.log(response, "response");
        localStorage.setItem(
          "summaryDetails",
          JSON.stringify(response.data.data)
        );
        setParameters(response.data.data);
      });
  }, []);
  return (
    <div>
      <NavBar />
      <div className={classes.root}>
        <div className={classes.block}></div>
        <div className={classes.display}>
          <div className={classes.flight}>{"Flight"}</div>
          <AirplaneTicketIcon
            className={classes.ticketicon}
            style={{ color: "#005dad" }}
          />
        </div>
        <div className={classes.display}>
          <FlightTakeoffIcon
            className={classes.depicon}
            style={{ color: "#005dad" }}
          />

          <div className={classes.dep}>
            {"Departure Flight:" + returnParameters.DepartureFlightNumber}
          </div>
          <div className={classes.depclass}>
            {returnParameters.departureCabin}
          </div>
        </div>
        {/* <div className={classes.depprice}>{returnParameters.departurePrice}</div> */}
        <div className={classes.display}>
          <div>
            <div className={classes.display}>
              <div className={classes.tim1dep}>
                {returnParameters.DepartureDepartureTime}
              </div>
              <div className={classes.count1dep}>
                {returnParameters.DepartureAirport}
              </div>
            </div>

            <div className={classes.dep1info}>
              {returnParameters.DepartureDepartureDate}
            </div>
            <div className={classes.dep1info}>
              {returnParameters.DepartureAirport + " International Airport"}{" "}
            </div>
          </div>

          <div>
            <div className={classes.display}>
              <div className={classes.tim2dep}>
                {returnParameters.DepartureDepartureTime}
              </div>
              <div className={classes.count2dep}>
                {" "}
                {returnParameters.ArrivalAirport}
              </div>
            </div>
            <div className={classes.dep12info}>
              {returnParameters.DepartureArrivalDate}
            </div>
            <div className={classes.dep12info}>
              {returnParameters.ArrivalAirport + " International Airport "}
            </div>
          </div>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.display}>
          <FlightLandIcon
            className={classes.arrivalicon}
            style={{ color: "#005dad" }}
          />
          <div className={classes.arrival}>
            {"Return Flight: " + returnParameters.ArrivalFlightNumber}
          </div>
          <div className={classes.arrivalclass}>
            {returnParameters.returnCabin}
          </div>
        </div>
        <div className={classes.display}>
          <div>
            <div className={classes.display}>
              <div className={classes.tim1arrival}>
                {returnParameters.ArrivalDepartureTime}
              </div>
              <div className={classes.count1arrival}>
                {" "}
                {returnParameters.ArrivalAirport}
              </div>
            </div>

            <div className={classes.arrival1info}>
              {returnParameters.ArrivalDepartureDate}
            </div>
            <div className={classes.arrival1info}>
              {returnParameters.ArrivalAirport + " International Airport"}
            </div>
          </div>

          <div>
            <div className={classes.display}>
              <div className={classes.tim2arrival}>
                {returnParameters.ArrivalArrivalTime}
              </div>
              <div className={classes.count2arrival}>
                {" "}
                {returnParameters.DepartureAirport}
              </div>
            </div>
            <div className={classes.arrival12info}>
              {returnParameters.ArrivalArrivalDate}
            </div>
            <div className={classes.arrival12info}>
              {returnParameters.DepartureAirport + " International Airport"}
            </div>
          </div>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.priceTotal}>
          {"Total price : " + returnParameters.Price}{" "}
        </div>
      </div>
      <Buttons
        ClassName={classes.button}
        title={"Confirm Booking"}
        onClick={handleConfirm}
      />
    </div>
  );
}
