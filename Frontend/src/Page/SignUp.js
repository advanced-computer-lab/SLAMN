import React from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@material-ui/core/Link";

import axios from "axios";
const useStyles = makeStyles((theme) => ({
  display: { display: "flex" },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#005dad",
    marginTop: "2vw",
    marginLeft: "48vw",
  },
  text2: {
    marginLeft: "38vw",
    marginTop: "1vw",
    width: "23vw !important",
  },
  text1: {
    marginLeft: "38vw",
    marginTop: "1vw",
    width: "23vw !important",
  },
  name: {
    marginLeft: "38vw",
    marginTop: "1vw",
    width: "23vw !important",
  },
  button: {
    marginLeft: "37vw",
    width: "23vw !important",
    marginTop: "1.5vw",
  },
  title: {
    marginLeft: "47vw",
  },
  link: {
    marginLeft: "49vw",
  },
  lastname: { marginLeft: "38vw", marginTop: "1vw", width: "23vw !important" },
  phone: { marginLeft: "38vw", marginTop: "1vw", width: "23vw !important" },
  passport: { marginLeft: "38vw", marginTop: "1vw", width: "23vw !important" },
  confirm: { marginLeft: "38vw", marginTop: "1vw", width: "23vw !important" },

  emailicon: { marginTop: "2.35vw", marginLeft: "1vw" },
  erroremailerror: { marginTop: "2.2vw", color: "crimson" },
  emailwithout: { marginTop: "2vw", color: "white" },
  errorfirst: { marginTop: "2.2vw", color: "crimson" },
  firsticon: { marginTop: "2.35vw", marginLeft: "1vw" },
  firstwithout: { marginTop: "2vw", color: "white" },
  lasterror: { marginTop: "2.2vw", color: "crimson" },
  lastwithout: { marginTop: "2vw", color: "white" },
  lasticon: { marginTop: "2.35vw", marginLeft: "1vw" },
  phoneerror: { marginTop: "2.2vw", color: "crimson" },
  phonewithout: { marginTop: "2vw", color: "white" },
  phoneicon: { marginTop: "2.35vw", marginLeft: "1vw" },
  passporterror: { marginTop: "2.2vw", color: "crimson" },
  passportwithout: { marginTop: "2vw", color: "white" },
  passporticon: { marginTop: "2.35vw", marginLeft: "1vw" },
  passworderrors: { marginTop: "2.2vw", color: "crimson" },
  passwordicon: { marginTop: "2.35vw", marginLeft: "1vw" },
  passwordwithout: { marginTop: "2vw", color: "white" },
  conicon: { marginTop: "2.35vw", marginLeft: "1vw" },
  conwithout: { marginTop: "2vw", color: "white" },
  conerror: { marginTop: "2.2vw", color: "crimson" },
}));

export default function Signin() {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passworderror, setpassworderror] = useState(false);
  const [passwordtext, setpasswordtext] = useState("");
  const [confirmpassworderror, setconfirmpassworderror] = useState(false);
  const [confirmpasswordtext, setconfirmpasswordtext] = useState("");
  const [emailerror, setemailerror] = useState(false);
  const [emailtext, setemailtext] = useState("");
  const [firsterror, setfirsterror] = useState(false);
  const [firsttext, setfirsttext] = useState("");
  const [lastnameerror, setlastnameerror] = useState(false);
  const [lasttext, setlasttext] = useState("");
  const [phoneerror, setphoneerror] = useState(false);
  const [phonetext, setphonetext] = useState("");
  const [passporterror, setpassporterror] = useState(false);
  const [passportext, setpassporttext] = useState("");
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
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangePassportNumber = (e) => {
    setPassportNumber(e.target.value);
  };

  const handleLogin = (e) => {
    var x = 7;
    if (firstName === "") {
      setfirsterror(true);
      setfirsttext("FirstName cannot be left empty ");
    } else if (/^\d+$/.test(firstName)) {
      setfirsterror(true);
      setfirsttext("FirstName should be of type string ");
    } else {
      setfirsterror(false);
      x--;
    }
    if (lastName === "") {
      setlastnameerror(true);
      setlasttext("LastName cannot be left empty ");
    } else if (/^\d+$/.test(lastName)) {
      setlastnameerror(true);
      setlasttext("LastName should be of type string ");
    } else {
      setlastnameerror(false);
      x--;
    }

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
    if (passportNumber === "") {
      setpassporterror(true);
      setpassporttext("PassportNumber cannot be left empty");
    } else {
      if (/^\d+$/.test(passportNumber)) {
        setpassporterror(true);
        setpassporttext("PassportNumber should be of type string ");
      } else {
        setpassporterror(false);
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

    if (!(confirmPassword === password)) {
      setconfirmpassworderror(true);
      setconfirmpasswordtext("Confirm password is not the same as password");
    } else {
      setconfirmpassworderror(false);
      x--;
    }

    if (phone === "") {
      setphoneerror(true);
      setphonetext("Phonenumber  cannot be left empty ");
    } else if (!(phone.match(/^[0-9]+$/) != null)) {
      setphoneerror(true);
      setphonetext("Phonenumber should contain only numbers ");
    } else if (!(phone.length === 10)) {
      setphoneerror(true);
      setphonetext("Phonenumber should contain only 10 numbers ");
    } else {
      setphoneerror(false);
      x--;
    }
    if (x === 0) {
      console.log("INNNNNNNNNNN");
      axios
        .post("http://localhost:8000/users/signup", {
          Email: email,
          Password: password,
          FirstName: firstName,
          LastName: lastName,
          Phone: phone,
          PassportNumber: passportNumber,
        })
        .then((res) => {
          console.log("in resss");
          console.log(res.data.message, "messsss");
          setemailerror(false);
          if (res.data.message === "Your account successfully created") {
            setemailerror(false);
            window.location = "/signin";
          }
          if (res.data.message === "Invalid Email,this email already exists") {
            console.log("in erroorrrrr");
            setemailerror(true);
            setemailtext("Invalid Email,this email already exists");
          }
        })
        .catch((err) => {
          console.log("inn eroro");
          console.log(err);
          setemailerror(true);
          setemailtext(err);
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
          Sign Up
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
        <div className={classes.name}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
            onChange={onChangeFirstName}
            error={firsterror}
          />
        </div>
        <CloseIcon
          style={firsterror ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className={classes.firsticon}
        />
        <div className={firsterror ? classes.errorfirst : classes.firstwithout}>
          {firsttext}
        </div>
      </div>
      <div className={classes.display}>
        <div className={classes.lastname}>
          {" "}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoFocus
            onChange={onChangeLastName}
            error={lastnameerror}
          />
        </div>
        <CloseIcon
          style={lastnameerror ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className={classes.lasticon}
        />
        <div
          className={lastnameerror ? classes.lasterror : classes.lastwithout}
        >
          {lasttext}
        </div>
      </div>
      <div className={classes.display}>
        <div className={classes.phone}>
          {" "}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoFocus
            onChange={onChangePhone}
            error={phoneerror}
          />
        </div>
        <CloseIcon
          style={phoneerror ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className={classes.phoneicon}
        />
        <div className={phoneerror ? classes.phoneerror : classes.phonewithout}>
          {phonetext}
        </div>
      </div>
      <div className={classes.display}>
        <div className={classes.passport}>
          {" "}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="passportNumber"
            label="Passport Number"
            name="passportNumber"
            onChange={onChangePassportNumber}
            error={passporterror}
          />
        </div>
        <CloseIcon
          style={passporterror ? { color: "crimson" } : { color: "white" }}
          fontSize="xsmall"
          className={classes.passporticon}
        />
        <div
          className={
            passporterror ? classes.passporterror : classes.passportwithout
          }
        >
          {passportext}
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
      <div className={classes.display}>
        <div className={classes.confirm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            autoFocus
            onChange={onChangeConfirmPassword}
            error={confirmpassworderror}
          />
        </div>
        <CloseIcon
          style={
            confirmpassworderror ? { color: "crimson" } : { color: "white" }
          }
          fontSize="xsmall"
          className={classes.conicon}
        />
        <div
          className={
            confirmpassworderror ? classes.conerror : classes.conwithout
          }
        >
          {confirmpasswordtext}
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
          Sign Up
        </Button>
      </div>
    </div>
  );
}
