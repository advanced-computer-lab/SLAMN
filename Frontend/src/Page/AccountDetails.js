import { ClassNames } from "@emotion/react";
import React from "react";
import NavBar from "../Componenets/General/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "../Componenets/AccountDetails/List";
import AccountForm from "../Componenets/AccountDetails/AccountForm";
import { useEffect } from "react";
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

export default function AccountDetails() {
  const classes = useStyles();
  const headers = window.localStorage.getItem("token");
  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  useEffect(() => {
    console.log(headers, "headersssssssssss");
    axios
      .post(
        "http://localhost:8000/users/displayaccount",
        {},
        {
          headers: {
            auth: headers,
          },
        }
      )
      .then((res) => {
        console.log(res.data.user.FirstName);
        setFirst(res.data.user.FirstName);
        setLast(res.data.user.LastName);
        setEmail(res.data.user.Email);
        setPass(res.data.user.PassportNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.welcome}>
        <div className={classes.welcometitle}>
          Welcome to your account {first} !
        </div>
      </div>
      <div className={classes.form}>
        <div className={classes.side}>
          <List />
        </div>
        <div className={classes.accountform}>
          <AccountForm
            firstname={first}
            lastname={last}
            email={email}
            passport={pass}
          />
        </div>
      </div>
    </div>
  );
}
