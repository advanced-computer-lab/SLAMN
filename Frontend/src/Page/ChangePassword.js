import React from "react";
import NavBar from "../Componenets/General/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import List from "../Componenets/AccountDetails/List";
import Accountform from "../Componenets/AccountDetails/ChangePassword";
import Button from "../Componenets/General/BasicButton";
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
  display: {
    display: "flex",
    marginTop: "-6vw",
    marginLeft: "21vw",
  },
});

export default function ChangePassword() {
  const classes = useStyles();
  const [oldpassword, setoldPassword] = useState("");
  const [errorold, seterrorold] = useState(false);
  const [erroroldconfrim, seterroroldconfrim] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorpass, seterrorpass] = useState(false);
  const [errorpassconfrim, seterrorpassconfrim] = useState(false);
  const [pass, setPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const headers = window.localStorage.getItem("token");
  const name = window.localStorage.getItem("name");

  const onChangePasssword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeOldPasssword = (e) => {
    setoldPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setconfirmPassword(e.target.value);
  };
  const onClickBack = () => {
    window.location = "/account";
  };
  const onClickPassword = () => {
    var x = 3;
    if (oldpassword === "") {
      seterrorold(true);
      seterroroldconfrim("Password cannot be left empty");
    } else {
      seterrorold(false);
      x--;
    }
    if (password === "") {
      seterrorpass(true);
      setPass("Password cannot be left empty");
    } else {
      seterrorpass(false);
      x--;
    }

    if (!(confirmPassword === password)) {
      seterrorpassconfrim(true);
      setconfirmPass("Confirm password is not the same as password");
    } else {
      seterrorpassconfrim(false);
      x--;
    }
    if (x === 0) {
      console.log("in babbyyy");
      axios
        .post(
          "http://localhost:8000/users/changepassword",
          {
            Password: oldpassword,
            newPassword: password,
          },
          {
            headers: {
              auth: headers,
            },
          }
        )
        .then(function (response) {
          console.log(response.data.message, "messageeeee");
          if (response.data.message === "success") {
            seterrorold(false);
            window.location = "/account";
          }
          if (response.data.message === "old password is wrong") {
            seterrorold(true);
            seterroroldconfrim("old password does not match");
            console.log(erroroldconfrim, "errorrrrrrrrr");
          }
        });
    }
  };

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.welcome}>
        <div className={classes.welcometitle}>
          Welcome to your account , {name} !
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
            oldpassword={onChangeOldPasssword}
            errorold={errorold}
            erroroldconfirm={erroroldconfrim}
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
