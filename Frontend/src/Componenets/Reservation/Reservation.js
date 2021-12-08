import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    width: "25vw",
    height: "15vw",
    padding: "0.5vw",
    borderRadius: "0.5vw !important",
    boxShadow: "1px 3px 1px #9E9E9E",
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

    marginLeft: "5.3vw",
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
});
export default function Reservation(props) {
  const classes = useStyles();
  const [update, setupdate] = React.useState(false);
  const [password, setPassword] = React.useState(false);

  const handleClick = () => {
    window.location = "/updateaccount";
  };
  const handleClickChange = () => {
    window.location = "/changepassword";
  };
  return (
    <div className={classes.root}>
      <div className={classes.title}>Booked Flight</div>

      <div className={classes.display}>
        <div className={classes.firstName}>Departure FlightNumber</div>
        <div className={classes.firstNameValue}> {props.flight.departure}</div>
      </div>
      <div className={classes.display}>
        <div className={classes.lastName}>Arrival FlightNumber</div>
        <div className={classes.lastNamevalue}> {props.flight.arrival}</div>
      </div>
    </div>
  );
}
