import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Divider from "@mui/material/Divider";
import Button from "../AccountDetails/Buttons";
import { useNavigate } from "react-router-dom";
import UserInfo from "../Seats/SeatReservationinfo";

const useStyles = makeStyles({
  root: {
    marginTop: "1vw",
    marginLeft: "2vw",
    backgroundColor: "white",
    width: "50vw",
    height: "20vw",
    padding: "0.5vw",
    borderRadius: "0.5vw !important",
    boxShadow: "1px 1.6px 1px #9E9E9E",
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
    marginTop: "0.5vw",
    marginLeft: "20vw",
    fontSize: "1.5vw",
  },
  tim2arrival: {
    fontWeight: "600",
    marginTop: "0.4vw",
    marginLeft: "20vw",
    fontSize: "1.5vw",
  },
  count2dep: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "0.5vw",
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

  button: {
    width: "2vw !important",
    height: "2vw  !important",
    marginLeft: "20vw",
  },
  priceandselect: {
    display: "flex",
    width: "50vw",
    justifyContent: "space-between",
  },
  price: {
    fontWeight: "700",
  },
  price2: {
    marginLeft: "1vw",
    marginTop: "0.5vw",
    color: "gray",
  },
});

export default function Card(props) {
  const classes = useStyles();
  const [reservation, setReservation] = useContext(UserInfo);
  const history = useNavigate();
  const handleClick = () => {
    if (props.flight.passengers === "") {
      props.setPopup({
        message: "To select this flight please select passengers",
        severity: "error",
      });
      props.setOpen(true);
    } else {
      if (props.flight.cabin === "") {
        props.setPopup({
          message: "To select this flight please select a cabin type",
          severity: "error",
        });
        props.setOpen(true);
      } else {
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
        <Button
          ClassName={classes.button}
          title={"Select "}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
