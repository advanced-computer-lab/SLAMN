import { makeStyles } from "@material-ui/core/styles";
import { fabClasses } from "@mui/material";
import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    height: "5vw",
    width: "24vw ",
    borderRadius: "0.3vw !important",
    boxShadow: "1px 3px 1px #9E9E9E",
  },
  root1: {
    backgroundColor: "white",
    cursor: "pointer",
    height: "5vw",
    width: "24vw ",
    borderRadius: "0.3vw !important",
    boxShadow: "1px 3px 1px #9E9E9E",
  },
  display: {
    display: "flex",
  },
  title: {
    color: "black",
    fontWeight: "600",
    fontSize: "1vw",
    marginTop: "0.7vw",
    marginLeft: "0.5vw",
    width: "10vw",
  },
  icon: {
    marginLeft: "0.8vw",
    marginTop: "1.4vw",
  },
  content: {
    fontSize: "0.7vw",
    marginLeft: "2.7vw",
    marginTop: "-0.8vw",
    color: "#6f6f6f",
  },
  arrow: {
    marginLeft: "10vw",
    marginTop: "1vw",
  },
});

export default function Card(props) {
  const classes = useStyles();
  const [login, setLogin] = useState(false);
  return (
    <div
      className={login == true ? classes.root1 : classes.root}
      onMouseOver={() => setLogin(true)}
      onMouseOut={() => setLogin(false)}
    >
      <div className={classes.display}>
        <div className={classes.icon}> {props.icon}</div>

        <div className={classes.title}>Check refund status </div>
        <div className={classes.arrow}>
          <ArrowForwardIosIcon style={{ color: "#005dad" }} fontSize="1" />
        </div>
      </div>
      <div className={classes.content}> {props.content}</div>
    </div>
  );
}
