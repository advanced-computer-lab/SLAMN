import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import "../../css/Reservation.css";
import Logo from "../General/Logo";
const useStyles = makeStyles({
  root: {
    // backgroundColor: "white",
    // width: "50vw",
    // height: "100vw",
    // padding: "0.5vw",
    // borderRadius: "0.5vw !important",
    // boxShadow: "1px 3px 1px #9E9E9E",
    // marginBottom: "3vw",
  },
  title: {
    color: "black",
    fontWeight: "bolder",
    fontSize: "1.5vw",
    fontFamily: " Rubik,sans-serif",
    marginLeft: "1.5vw",
    marginTop: "2vw",
  },
  firstName: {
    marginTop: "1.5vw",
    fontSize: "1vw",
    fontWeight: "revert",
    marginLeft: "1.5vw",
  },
  firstNameValue: {
    fontWeight: "bolder",
    marginTop: "1.5vw",
    fontSize: "1vw",

    marginLeft: "5.2vw",
  },
  lastName: {
    marginTop: "1vw",
    fontSize: "1vw",
    fontWeight: "revert",
    marginLeft: "1.5vw",
  },
  lastNamevalue: {
    fontWeight: "bolder",
    marginTop: "1vw",
    fontSize: "1vw",

    marginLeft: "6.85vw",
  },
  email: {
    marginTop: "1vw",
    fontSize: "1vw",
    fontWeight: "revert",
    marginLeft: "1.5vw",
  },

  emailvalue: {
    fontWeight: "bolder",
    marginTop: "1vw",
    fontSize: "1vw",

    marginLeft: "7.6vw",
  },
  passport: {
    marginTop: "1vw",
    fontSize: "1vw",
    fontWeight: "revert",
    marginLeft: "1.5vw",
    marginBottom: "2vw",
  },
  passportvalue: {
    fontWeight: "bolder",
    marginTop: "1vw",
    fontSize: "1vw",

    marginLeft: "2.21vw",
    marginBottom: "2vw",
  },
  display: {
    display: "flex",
  },
  updateFocus: {
    textDecoration: "underline",
    color: "#005dad",
    marginLeft: "1.5vw",
    marginTop: "1vw",

    cursor: "pointer",
  },
  updateBlur: {
    marginLeft: "1.5vw",
    marginTop: "1vw",
    textDecoration: "underline",
    cursor: "pointer",
  },
  passFocus: {
    textDecoration: "underline",
    color: "#005dad",
    marginLeft: "2vw",
    marginTop: "1vw",

    cursor: "pointer",
  },
  passBlur: {
    marginLeft: "2vw",
    marginTop: "1vw",
    textDecoration: "underline",
    cursor: "pointer",
  },
  display: {
    display: "flex",
  },
  title1: {
    color: "aaa",
    fontWeight: "bolder",
    fontSize: "1.5vw",
    fontFamily: " Rubik,sans-serif",
    marginLeft: "1vw",
    marginTop: "2vw",
  },
});
export default function Reservation(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div class="ticket">
        <header>
          <div class="company-name">SLAMN Airlines</div>
          <div class="gate">
            <div>FlightNumber</div>
            <div>{props.flight.departure}</div>
          </div>
        </header>
        <section class="airports">
          <div class="airport">
            <div class="airport-name">Charlotte</div>
            <div class="airport-code">CLT</div>
            <div class="dep-arr-label">Departing</div>
            <div class="time">7:45am</div>
          </div>
          <div class="airport">
            <div class="airport-name">Tampa</div>
            <div class="airport-code">TPA</div>
            <div class="dep-arr-label">Arriving</div>
            <div class="time">9:15am</div>
          </div>
        </section>
        <section class="place">
          <div class="place-block">
            <div class="place-label">Group</div>
            <div class="place-value">2</div>
          </div>
          <div class="place-block">
            <div class="place-label">Seat</div>
            <div class="place-value">2A</div>
          </div>
          <div class="place-block">
            <div class="place-label">Term</div>
            <div class="place-value">B</div>
          </div>
          <div class="qr">
            <img src="http://www.classtools.net/QR/pics/qr.png" />
          </div>
        </section>
      </div>
    </div>
  );
}
