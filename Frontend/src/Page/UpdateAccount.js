import { ClassNames } from "@emotion/react";
import React from "react";
import NavBar from "../Componenets/General/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "../Componenets/AccountDetails/List";
import AccountForm from "../Componenets/AccountDetails/AccountFormUpdate";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    background: " gainsboro",
    width: "100vw",
    height: "49vw",
  },
  loginBlur: {
    backgroundColor: "white !important",
    height: "2vw",
    width: "2vw",
    marginTop: "1vw",
    marginLeft: "89vw",
  },
  loginFocus: {
    backgroundColor: "#ffd633 !important",
    height: "2vw",
    width: "2vw",
    marginTop: "1vw",
    marginLeft: "89vw",
  },
  welcometitle: {
    // fontSize: "2vw !important",
    width: "100vw",
    height: "1vw",
    padding: "1.5vw !important",
    marginLeft: "4vw !important",
  },
  welcome: {
    background: "white",
    width: "100vw",
    height: "5vw",
    fontSize: "2vw",
    boxShadow: "1px 2px 1px #9E9E9E",
  },

  form: {
    display: "flex",
  },
  accountform: {
    marginTop: "2vw",
    marginLeft: "2vw",
  },
  side: {
    marginLeft: "6vw",
    marginTop: "2vw",
  },
});



export default function UpdateAccount() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passport, setPassport] = useState("");

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassport = (e) => {
    setPassport(e.target.value);
  };
  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.welcome}>
        <div className={classes.welcometitle}>
          Welcome to your account , xxx !
        </div>
      </div>
      <div className={classes.form}>
        <div className={classes.side}>
          <List disabled={true} />
        </div>
        <div className={classes.accountform}>
          <AccountForm
            firstName={onChangeFirstName}
            lastName={onChangeLastName}
            email={onChangeEmail}
            passport={onChangePassport}
            first={firstName}
            last={lastName}
            emails={email}
            passports={passport}
          />
        </div>
      </div>
    </div>
  );
}
