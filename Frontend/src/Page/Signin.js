import React from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import { filledInputClasses } from "@mui/material";
import { red } from "@mui/material/colors";
const useStyles = makeStyles((theme) => ({
  display: { display: "flex" },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#005dad",
    marginTop: "7vw",
    marginLeft: "48vw",
  },
  text2: {
    marginLeft: "38vw",
    marginTop: "2vw",
    width: "23vw !important",
  },
  text1: {
    marginLeft: "38vw",
    marginTop: "2vw",
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
  emailicon: { marginTop: "2.35vw", marginLeft: "1vw" },
  erroremailerror: { marginTop: "2.2vw", color: "crimson" },
  emailwithout: { marginTop: "2vw", color: "white" },
  errorfirst: { marginTop: "2.2vw", color: "crimson" },
  passworderrors: { marginTop: "2.2vw", color: "crimson" },
  passwordicon: { marginTop: "2.35vw", marginLeft: "1vw" },
  passwordwithout: { marginTop: "2vw", color: "white" },
}));

export default function Signin() {
  const classes = useStyles();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passworderror, setpassworderror] = useState(false);
  const [passwordtext, setpasswordtext] = useState("");
  const [emailtext, setemailtext] = useState("");
  const [emailerror, setemailerror] = useState(false);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleLogin = (e) => {
    var x = 2;
    if (email === "") {
      console.log(email);
      setemailerror(true);
      setemailtext("Email could not be left empty ");
    } else {
      if (!validateEmail(email)) {
        setemailerror(true);
        setemailtext("Email should be in xxxx@y.com format");
      } else {
        setemailerror(false);
        x--;
      }
    }
    if (password === "") {
      console.log("innnnnnnn");
      setpassworderror(true);
      setpasswordtext("Password cannot be left empty");
    } else {
      console.log("out");
      setpassworderror(false);
      x--;
    }
    if (x == 0) {
      console.log("INNNNNNNNNNN");
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
          window.localStorage.setItem("logged", "false");
          if (res.data.message === "Success") {
            console.log(res.data, "IN SUCCCC");
            setemailerror(false);
            setpassworderror(false);
            console.log("innnnnnnnnnnnn");
            if (res.data.data == true) {
              console.log(res.data, "IN ADMIN");
              window.localStorage.setItem("admin", "true");
              window.localStorage.setItem("logged", "true");
              window.localStorage.setItem("email", email);

              window.location = "/homeadmin";
            }
            if (res.data.data == false) {
              console.log(res.data, "in homeee");
              window.localStorage.setItem("admin", "false");
              window.localStorage.setItem("email", email);
              window.localStorage.setItem("logged", "true");
              window.location = "/home";
            }
          }
          if (res.data.message === "Invalid Password") {
            setpassworderror(true);
            setpasswordtext("Invalid Password");
            console.log("error");
          }
          if (res.data.message === "Invalid Email") {
            console.log("error");
            setemailerror(true);
            setemailtext("Invalid Email");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon style={{ color: "#ffd633" }} />
        </Avatar>
        <Typography className={classes.title} component="h1" variant="h5">
          Sign In
        </Typography>
      </div>
      <div className={classes.display}>
        <div className={classes.text1}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChangeEmail}
            error={emailerror}
          />
        </div>
        <CloseIcon
          style={emailerror ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className={classes.emailicon}
        />
        <div
          className={
            emailerror ? classes.erroremailerror : classes.emailwithout
          }
        >
          {emailtext}
        </div>
      </div>
      <div className={classes.display}>
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
            onChange={onChangePassword}
            error={passworderror}
          />
        </div>
        <CloseIcon
          style={passworderror ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className={classes.passwordicon}
        />
        <div
          className={
            passworderror ? classes.passworderrors : classes.passwordwithout
          }
        >
          {passwordtext}
        </div>
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
