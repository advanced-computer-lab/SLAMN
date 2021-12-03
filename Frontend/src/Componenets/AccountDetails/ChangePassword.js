import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import Textfield from "../AccountDetails/Textfields";
import Button from "../General/Buttons";
import CloseIcon from "@mui/icons-material/Close";
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
    marginTop: "2vw",
    fontSize: "1vw",
    fontWeight: "revert",
    marginLeft: "1.5vw",
  },
  firstNameValue: {
    fontWeight: "bolder",
    //marginTop: "1.5vw",
    fontSize: "1vw",

    marginLeft: "9.8vw",
  },
  lastName: {
    marginTop: "1vw",
    fontSize: "1vw",
    fontWeight: "revert",
    marginLeft: "1.5vw",
  },
  lastNamevalue: {
    fontWeight: "bolder",
    marginTop: "-1vw",
    fontSize: "1vw",

    marginLeft: "6vw",
  },

  display: {
    display: "flex",
  },

  button: {
    marginLeft: "38vw",
    marginTop: "1vw",
    width: "1vw !important",
    height: "1vw !important",
    color: "black !important",
  },
  text: {
    width: "2vw !important",
    color: "blue !important",
  },
  errofirsticon: { marginTop: "2.35vw" },
  errofirst: { marginTop: "2vw", color: "crimson" },
  first: { marginTop: "2vw", color: "white" },
  errorlastname: { marginTop: "1vw", color: "crimson" },
  lastwithout: { marginTop: "1vw", color: "white" },
  errolasticon: { marginTop: "1.35vw" },
  erroremail: { marginTop: "1vw", color: "crimson" },
  emails: { marginTop: "1vw", color: "white" },
  erroemailicon: { marginTop: "1.35vw" },
  errorpass: { marginTop: "1vw", color: "crimson" },
  passports: { marginTop: "1vw", color: "white" },
  erropassicon: { marginTop: "1.35vw" },
});

export default function ChangePassword(props) {
  const classes = useStyles();
  const [update, setupdate] = React.useState(false);
  const [errorfirst, setErrorfirst] = React.useState(false);

  const [errorlast, setErrorlast] = React.useState(false);

  const OnClickUpdate = () => {
    console.log("innnnn0");
    //window.location = "/updateaccount";
    if (props.first === "") {
      setErrorfirst(true);
    } else {
      setErrorfirst(false);
    }

    if (props.last === "") {
      setErrorlast(true);
    } else {
      setErrorlast(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>Account Details</div>

      <div className={classes.display}>
        <div className={classes.firstName}>Password</div>
        <div className={classes.firstNameValue}>
          {" "}
          <Textfield
            error={props.errorpass}
            onChange={props.password}
            type={"password"}
          />
        </div>

        <CloseIcon
          style={props.errorpass ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className={classes.errofirsticon}
        />
        <div className={props.errorpass ? classes.errofirst : classes.first}>
          {props.errorpasserror}
        </div>
      </div>
      <div className={classes.display}>
        <div className={classes.lastName}>Confirm Password</div>
        <div className={classes.lastNamevalue}>
          {" "}
          <Textfield
            error={props.errorpassconfrim}
            className={classes.text}
            onChange={props.confirmpassword}
            type={"password"}
          />
        </div>
        <CloseIcon
          style={
            props.errorpassconfrim ? { color: "crimson" } : { color: "white" }
          }
          fontSize="xsmall"
          className={classes.errolasticon}
        />
        <div
          className={
            props.errorpassconfrim ? classes.errorlastname : classes.lastwithout
          }
        >
          {props.errorpassconfirmerror}
        </div>
      </div>

      <Divider />
      <div
        className={classes.button}
        onMouseOver={() => setupdate(true)}
        onMouseOut={() => setupdate(false)}
        onClick={() => setupdate(true)}
      ></div>
    </div>
  );
}
