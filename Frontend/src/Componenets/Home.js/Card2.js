import { makeStyles } from "@material-ui/core/styles";
import { fabClasses } from "@mui/material";
import React from "react";
import FmdBadIcon from "@mui/icons-material/FmdBad";
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
  display: {
    display: "flex",
  },
  title: {
    color: "black",
    fontWeight: "600",
    fontSize: "1vw",
    marginTop: "0.7vw",
    marginLeft: "0.5vw",
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
    marginLeft: "15.5vw",
    marginTop: "1vw",
  },
  root1: {
    backgroundColor: "white",
    cursor: "pointer",
    height: "5vw",
    width: "24vw ",
    borderRadius: "0.3vw !important",
    boxShadow: "1px 3px 1px #9E9E9E",
  },
});

export default function Card2(props) {
  const classes = useStyles();
  const [login, setLogin] = useState(false);
  return (
    <div
      className={login == true ? classes.root1 : classes.root}
      onMouseOver={() => setLogin(true)}
      onMouseOut={() => setLogin(false)}
    >
      <div className={classes.display}>
        <div className={classes.icon}>
          {" "}
          <FmdBadIcon style={{ color: "#005dad" }} />
        </div>

        <div className={classes.title}> COVID-19</div>
        <div className={classes.arrow}>
          <ArrowForwardIosIcon style={{ color: "#005dad" }} fontSize="1" />
        </div>
      </div>
      <div className={classes.content}>
        {" "}
        Find here more information about COVID-19
      </div>
    </div>
  );
}
