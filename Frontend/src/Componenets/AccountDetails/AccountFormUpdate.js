import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import Textfield from "../AccountDetails/Textfields";
import Button from "../General/BasicButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useEffect, useState } from "react";
const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    width: "60vw",
    height: "32vw",
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
    marginTop: "1.5vw",
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
    marginTop: "1.5vw",

    marginLeft: "9.9vw",
  },
  email: {
    marginTop: "1vw",
    fontSize: "1vw",
    fontWeight: "revert",
    marginLeft: "1.6vw",
  },

  emailvalue: {
    fontWeight: "bolder",
    marginTop: "-1vw",
    fontSize: "1vw",
    marginTop: "1.5vw",
    marginLeft: "12.1vw",
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
    marginTop: "-1vw",
    fontSize: "1vw",
    marginTop: "1.5vw",

    marginLeft: "6.8vw",
    marginBottom: "2vw",
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
  errofirsticon: { marginTop: "2.35vw", marginLeft: "1vw" },
  errofirst: { marginTop: "2.2vw", color: "crimson" },
  first: { marginTop: "2vw", color: "white" },
  errorlastname: { marginTop: "2.2vw", color: "crimson" },
  lastwithout: { marginTop: "1vw", color: "white" },
  errolasticon: { marginTop: "2.35vw", marginLeft: "1vw" },
  erroremail: { marginTop: "2vw", color: "crimson" },
  emails: { marginTop: "1vw", color: "white" },
  erroemailicon: { marginTop: "2.35vw", marginLeft: "1vw" },
  errorpass: { marginTop: "2.1vw", color: "crimson" },
  passports: { marginTop: "2vw", color: "white" },
  erropassicon: { marginTop: "2.35vw", marginLeft: "1vw" },

  display2: {
    display: "flex",
    marginTop: "0.5vw",
  },
  b1: {
    width: "15.5vw",
    marginTop: "0.8vw",
    height: "2vw",
    marginLeft: "0.3vw",
  },
  b2: {
    width: "15.5vw",
    marginTop: "0.8vw",
    height: "2vw",
    marginLeft: "-2vw",
  },
  display: {
    display: "flex",
  },
});
export default function AccountForm(props) {
  const classes = useStyles();
  const headers = window.localStorage.getItem("token");
  const [update, setupdate] = React.useState(false);
  const [errorfirst, setErrorfirst] = React.useState(false);
  const [errormessageFirst, seterrormessageFirst] = React.useState("");

  const [errorlast, setErrorlast] = React.useState(false);
  const [errormessageLast, seterrormessageLast] = React.useState("");

  const [erroremail, setErroremail] = React.useState(false);
  const [errormessageEmail, seterrormessageEmail] = React.useState("");

  const [errorpass, setErrorpass] = React.useState(false);
  const [errormessagePass, seterrormessagePass] = React.useState("");

  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState("");
  const [emails, setEmails] = React.useState("");
  const [pass, setPass] = React.useState("");

  const name = window.localStorage.getItem("name");
  const lastname = window.localStorage.getItem("lastname");
  const email = window.localStorage.getItem("email");
  const passport = window.localStorage.getItem("passportNumber");

  useEffect(async () => {
    props.setfirst(name);
    props.setlastname(lastname);
    props.setEmail(email);
    props.setPass(passport);
    console.log("name", name);
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const OnClickUpdate = () => {
    console.log(props.firstname, "whatttttttttt ba2aaaaaaaaaaaa");
    let x = 4;
    console.log(props.first, "firstttttt");
    console.log(props.last, "last");
    console.log(props.passports, "pass");
    console.log(props.emails, "email");
    //window.location = "/updateaccount";
    if (props.first === "") {
      console.log("what happended");
      setErrorfirst(true);
      seterrormessageFirst("FirstName cannot be left empty ");
    } else if (/^\d+$/.test(props.first)) {
      setErrorfirst(true);
      seterrormessageFirst("FirstName should be of type string ");
    } else {
      console.log("innnnnnnnnnnnn");
      setErrorfirst(false);
      x--;
    }

    if (props.emails === "") {
      console.log(props.emails);
      setErroremail(true);
      seterrormessageEmail("Email could not be left empty ");
    } else {
      if (!validateEmail(props.emails)) {
        setErroremail(true);
        seterrormessageEmail("Email should be in xxxx@y.com format");
      } else {
        setErroremail(false);
        x--;
      }
    }
    if (props.passports === "") {
      console.log(props.passports, "passsssssssssssssssssssssssssssssssssssss");
      setErrorpass(true);
      seterrormessagePass("PassportNumber cannot be left empty");
    } else {
      if (/^\d+$/.test(props.passports)) {
        setErrorpass(true);
        seterrormessagePass("PassportNumber should be of type string ");
      } else {
        setErrorpass(false);
        x--;
      }
    }

    if (props.last === "") {
      setErrorlast(true);
      seterrormessageLast("LastName cannot be left empty");
    } else {
      if (/^\d+$/.test(props.last)) {
        setErrorlast(true);
        seterrormessageLast("LastName should be of type string ");
      } else {
        setErrorlast(false);
        x--;
      }
    }
    if (x === 0) {
      console.log("INNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
      axios
        .post(
          "http://localhost:8000/users/updateAccount",
          {
            FirstName: props.first,
            LastName: props.last,
            Email: props.emails,
            PassportNumber: props.passports,
          },
          {
            headers: {
              auth: headers,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          if (response.data.message === "success") {
            window.location = "/account";
          }
        });
    }
  };
  const OnClickBack = () => {
    window.location = "/account";
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>Account Details</div>

      <div className={classes.display}>
        <div className={classes.firstName}>First Name</div>
        <div className={classes.firstNameValue}>
          {" "}
          <Textfield
            error={errorfirst}
            onChange={props.firstName}
            defaultValue={name}
          />
        </div>

        <CloseIcon
          style={errorfirst ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className={classes.errofirsticon}
        />
        <div className={errorfirst ? classes.errofirst : classes.first}>
          {errormessageFirst}
        </div>
      </div>
      <div className={classes.display}>
        <div className={classes.lastName}>Last Name</div>
        <div className={classes.lastNamevalue}>
          {" "}
          <Textfield
            error={errorlast}
            className={classes.text}
            onChange={props.lastName}
            defaultValue={lastname}
          />
        </div>
        <CloseIcon
          style={errorlast ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className={classes.errolasticon}
        />
        <div
          className={errorlast ? classes.errorlastname : classes.lastwithout}
        >
          {errormessageLast}
        </div>
      </div>
      <div className={classes.display}>
        <div className={classes.email}>Email</div>
        <div className={classes.emailvalue}>
          {" "}
          <Textfield
            error={erroremail}
            onChange={props.email}
            defaultValue={email}
          />
        </div>
        <CloseIcon
          style={erroremail ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className={classes.erroemailicon}
        />
        <div className={erroremail ? classes.erroremail : classes.emails}>
          {errormessageEmail}
        </div>
      </div>
      <div className={classes.display}>
        <div className={classes.passport}>Passport Number </div>
        <div className={classes.passportvalue}>
          {" "}
          <Textfield
            error={errorpass}
            onChange={props.passport}
            defaultValue={passport}
          />
        </div>
        <CloseIcon
          style={errorpass ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className={classes.erropassicon}
        />
        <div className={errorpass ? classes.errorpass : classes.passports}>
          {errormessagePass}
        </div>
      </div>

      <Divider />
      <div className={classes.display}>
        <div className={classes.b1}>
          <Button
            title="Update Profile"
            onClick={OnClickUpdate}
            fullWidth={"true"}
          />
        </div>
        <div className={classes.b1}>
          <Button title="Back " onClick={OnClickBack} fullWidth={"true"} />
        </div>
      </div>
    </div>
  );
}
