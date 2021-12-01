import React from "react";
import TextBox from "../Componenets/General/TextBox";
import Button from "../Componenets/General/Buttons";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import { useState } from "react";
import SnackBar from "../Componenets/General/SnackBar";
const useStyles = makeStyles((theme) => ({}));

export default function SigninPage() {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [open1, setOpen1] = useState(false);
  const [error, seterror] = useState("");
  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleLogin = (e) => {
    console.log("password", "emaill");
    console.log("email", "passssssssssss");

    if (password === "") {
      seterror("Password cannot be empty");
      handleOpen1();
    }

    if (email === "") {
      seterror("Email cannot be empty");
      handleOpen1();
    } else {
      console.log("innnnnnnnnnnn");
      axios
        .post("http://localhost:8000/users/signin", {
          Email: email,
          Password: password,
        })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    // window.location = "/home";
  };
  return (
    <div>
      <div className={classes.space}>
        <TextBox title={"Email Address"} onChange={onChangeEmail} />
      </div>
      <div className={classes.space}>
        <TextBox title={"Password"} onChange={onChangePassword} />
      </div>
      <Button title="Sign in " onClick={handleLogin} />

      <SnackBar
        open={open1}
        handleOpen={handleOpen1}
        handleClose={handleClose1}
        error={error}
      />
    </div>
  );
}
