import React from "react";
import NavBar from "../Componenets/General/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "../Componenets/AccountDetails/List";
import Accountform from "../Componenets/AccountDetails/ChangePassword";
import Button from "../Componenets/General/BasicButton";
import { useState } from "react";

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
  display: {
    display: "flex",
    marginTop: "-6vw",
    marginLeft: "21vw",
  },
});

export default function ChangePassword() {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorpass, seterrorpass] = useState(false);
  const [errorpassconfrim, seterrorpassconfrim] = useState(false);
  const [pass, setPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");

  const onChangePasssword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setconfirmPassword(e.target.value);
  };
  const onClickBack = () => {
    window.location = "/account";
  };
  const onClickPassword = () => {
    if (password === "") {
      seterrorpass(true);
      setPass("Password cannot be left empty");
    } else {
      seterrorpass(false);
    }
    if (confirmPass === "") {
      seterrorpassconfrim(true);
      setconfirmPass("Confirm password cannot be left empty");
    } else if (!(confirmPassword === password)) {
      seterrorpassconfrim(true);
      setconfirmPass("Confirm password is not the same ");
    } else {
      seterrorpassconfrim(false);
    }
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
          <Accountform
            password={onChangePasssword}
            confirmpassword={onChangeConfirmPassword}
            errorpass={errorpass}
            errorpassconfrim={errorpassconfrim}
            errorpasserror={pass}
            errorpassconfirmerror={confirmPass}
          />
        </div>
      </div>
      <div className={classes.display}>
        <div>
          <Button title="Change Password" onClick={onClickPassword} />{" "}
        </div>
        <div>
          <Button title="Back" onClick={onClickBack} />
        </div>
      </div>
    </div>
  );
}
