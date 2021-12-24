import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import tom from "../Home.js/images/primes.png";
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
    marginLeft: "15vw",
    marginTop: "6vw",
  },
  root: {
    backgroundColor: "white",
    height: "20vw",
    width: "25vw",
    marginTop: "1vw",
    marginLeft: "22vw",
    borderRadius: "0.5vw",
  },
  root1: {
    backgroundColor: "rgb(209, 232, 254)",
    borderRadius: "0.5vw",
    height: "20vw",
    width: "25vw",
    marginTop: "1vw",
    marginLeft: "22vw",
  },
});

export default function Deals() {
  const [login, setLogin] = useState(false);

  const classes = useStyles();
  return (
    <div
      className={login == true ? classes.root1 : classes.root}
      onMouseOver={() => setLogin(true)}
      onMouseOut={() => setLogin(false)}
    >
      <div className={classes.back}></div>
      <div>
        <div className={classes.t1}>Over 2 Million Prime members</div>
        <div className={classes.t2}>Discover Prime</div>
      </div>
    </div>
  );
}
