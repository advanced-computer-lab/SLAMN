import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    width: "60vw",
    height: "20vw",
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

    marginLeft: "5.3vw",
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

    marginLeft: "5.5vw",
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

    marginLeft: "7.85vw",
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

    marginLeft: "2.6vw",
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
  },
  updateBlur: {
    marginLeft: "1.5vw",
    marginTop: "1vw",
    textDecoration: "underline",
  },
});
export default function AccountDetails() {
  const classes = useStyles();
  const [update, setupdate] = React.useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.title}>Account Details</div>

      <div className={classes.display}>
        <div className={classes.firstName}>First Name</div>
        <div className={classes.firstNameValue}> Nour</div>
      </div>
      <div className={classes.display}>
        <div className={classes.lastName}>Last Name</div>
        <div className={classes.lastNamevalue}> Nour</div>
      </div>
      <div className={classes.display}>
        <div className={classes.email}>Email</div>
        <div className={classes.emailvalue}> Nour</div>
      </div>
      <div className={classes.display}>
        <div className={classes.passport}>Passport Number </div>
        <div className={classes.passportvalue}> Nour</div>
      </div>

      <Divider />
      <div
        className={update == true ? classes.updateFocus : classes.updateBlur}
        onMouseOver={() => setupdate(true)}
        onMouseOut={() => setupdate(false)}
        onClick={() => setupdate(true)}
      >
        I want to update my account
      </div>
    </div>
  );
}
