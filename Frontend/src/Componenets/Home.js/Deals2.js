import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import tom from "../Home.js/images/app.png";
import { useState } from "react";

const useStyles = makeStyles({
  back: {
    width: "25vw",
    backgroundImage: `url(${tom})`,
    height: "10vw",
    borderRadius: "0.5vw",
  },
  t1: {
    fontWeight: "bold",
    fontSize: "1.1vw",
    marginTop: "0.5vw",
    marginLeft: "0.5vw",
  },
  t2: {
    fontWeight: "bold",
    fontSize: "1.3vw",
    marginLeft: "18vw",
    marginTop: "6vw",
  },
  root: {
    backgroundColor: "white",
    height: "20vw",
    width: "25vw",
    marginTop: "1vw",
    marginLeft: "5vw",
    borderRadius: "0.5vw",
  },
  root1: {
    backgroundColor: "rgb(209, 232, 254)",
    height: "20vw",
    width: "25vw",
    marginTop: "1vw",
    marginLeft: "5vw",
    borderRadius: "0.5vw",
  },
});

export default function Deals() {
  const classes = useStyles();
  const [login, setLogin] = useState(false);

  return (
    <div
      className={login == true ? classes.root1 : classes.root}
      onMouseOver={() => setLogin(true)}
      onMouseOut={() => setLogin(false)}
    >
      <div className={classes.back}></div>
      <div>
        <div className={classes.t1}>Get €10* off your flight</div>
        <div className={classes.t2}>Download</div>
      </div>
    </div>
  );
}
