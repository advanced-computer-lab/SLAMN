import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@mui/icons-material/Check";
import EmailIcon from "@mui/icons-material/Email";

const useStyles = makeStyles({
  root: {
    width: "98.9vw ",
    height: "3.5vw",
    background: "#198cfb",
    marginTop: "2vw !important",
    paddingTop: "0.7vw",
  },
  email: {
    borderRadius: "50px",
    backgroundColor: " white",
    height: "2.5vw",
    width: "2.5vw",

    //marginTop: "3vw",

    marginLeft: "12.5vw",
    //padding: "0.2vw",
  },
  email2: {
    marginLeft: "0.25vw",
    marginTop: "0.2vw",
    //padding: "1.5vw",
  },
  display: {
    display: "flex",
  },
  h1: {
    color: "white",
    marginLeft: "0.8vw",
    fontWeight: "400",
    fontSize: "1vw",
  },
  ct1: { marginLeft: "-10vw", marginTop: "1.5vw" },
  t1: { marginTop: "1.5vw", color: "white", fontWeight: "bold" },

  ct2: { marginLeft: "0.8vw", marginTop: "1.5vw" },
  t2: { marginTop: "1.5vw", color: "white", fontWeight: "bold" },
  ct3: { marginLeft: "0.8vw", marginTop: "1.5vw" },
  t3: { marginTop: "1.5vw", color: "white", fontWeight: "bold" },

  input: {
    width: "28vw ",
    boxSizing: "border-box",
    transition: "all .1s linear",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "1.4",
    borderRadius: "4px",
    padding: "9.5px 10px",
    backgroundColor: "#fff",
    border: " 1px solid #198cfb",
    color: "#333",
    marginLeft: "16.5vw",
  },
  button: {
    color: "#005dad !important",
    fontSize: "1vw",
    borderStyle: "solid ",
    borderColor: "#ccc",
    boxShadow: "none",
    background: "#fff",
    width: "5vw",
    marginLeft: "-0.1vw",
    borderRadius: "4px",
    fontWeight: "bold",
  },
});

export default function Signup() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.display}>
        <div className={classes.email}>
          <EmailIcon
            className={classes.email2}
            style={{ color: "#198cfb" }}
            fontSize="large"
          />
        </div>
        <div className={classes.h1}> Be the first to receive:</div>

        <div className={classes.ct1}>
          <CheckIcon style={{ color: "white" }} fontSize="small" />
        </div>
        <div className={classes.t1}> Travel discounts</div>

        <div className={classes.ct2}>
          <CheckIcon style={{ color: "white" }} fontSize="small" />
        </div>
        <div className={classes.t2}> Voucher codes</div>

        <div className={classes.ct3}>
          <CheckIcon style={{ color: "white" }} fontSize="small" />
        </div>
        <div className={classes.t3}> Exclusive deals</div>

        <input
          type="text"
          className={classes.input}
          placeholder="Please enter an email address"
          data-placeholder="Enter your email address"
          data-error-missing="Please enter an email address"
          data-error-invalid="Enter a valid email address"
        ></input>
        <button className={classes.button}>Sign up </button>
      </div>
    </div>
  );
}
