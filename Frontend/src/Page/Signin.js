import React from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import axios from "axios";
const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#005dad",
    marginTop: "7vw",
    marginLeft: "48vw",
  },
  text2: {
    marginLeft: "37vw",
    width: "23vw !important",
  },
  text1: {
    marginLeft: "37vw",
    width: "23vw !important",
  },
  button: {
    marginLeft: "37vw",
    width: "23vw !important",
  },
  title: {
    marginLeft: "47vw",
  },
  link: {
    marginLeft: "49vw",
  },
}));

export default function Signin() {
  const classes = useStyles();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleLogin = (e) => {
    console.log(email, "email");
    console.log(password, "pass");

    axios
      .post("http://localhost:8000/users/signin", {
        Email: email,
        Password: password,
      })
      .then((res) => {
        console.log(res);
        console.log("this " + "  " + res.headers.auth);
        window.localStorage.setItem("token", res.headers.auth);
        console.log(window.localStorage);
        if (res.data.message === "Success") {
          window.location = "/home";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon style={{ color: "#ffd633" }} />
        </Avatar>
        <Typography className={classes.title} component="h1" variant="h5">
          Sign in
        </Typography>
      </div>
      <div className={classes.text1}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={onChangeEmail}
        />
      </div>
      <div className={classes.text2}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={onChangePassword}
        />
      </div>
      <div className={classes.button}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          onClick={handleLogin}
          style={{ backgroundColor: "#005dad" }}
        >
          Sign In
        </Button>
      </div>
      <Link className={classes.link} href="signup" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </div>
  );
}
