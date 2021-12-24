import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import app from "../Home.js/images/android.png";
import appstore from "../Home.js/images/appstore.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Logo from "../General/Logo2";
import { fabClasses } from "@mui/material";
import { useState } from "react";
const useStyles = makeStyles({
  root: {
    width: "100%vw",
    height: "38vw",
  },
  display: {
    display: "flex",
  },
  h1: {
    marginTop: "3vw",
    fontWeight: "700",
    marginLeft: "15vw",
  },
  h2: {
    marginTop: "3vw",
    fontWeight: "700",
    marginLeft: "10.9vw",
  },
  h3: {
    marginTop: "3vw",
    fontWeight: "700",
    marginLeft: "21.93vw",
  },
  t1: {
    marginTop: "2vw",
    //fontWeight: "700",
    marginLeft: "15vw",
  },
  t2: {
    marginTop: "2vw",
    //fontWeight: "700",
    marginLeft: "10vw",
  },
  t3: {
    marginTop: "2vw",
    //    / fontWeight: "700",
    marginLeft: "9vw",
  },
  app: {
    height: "2.5vw",
    width: "9vw",
    backgroundImage: `url(${app})`,
    marginLeft: "14.8vw",
    borderRadius: "0.2vw",
    marginTop: "2vw",
  },
  app2: {
    height: "2.5vw",
    marginTop: "2vw",
    width: "9vw",
    backgroundImage: `url(${appstore})`,
    borderRadius: "0.2vw",
    marginLeft: "1vw",
  },
  c1: {
    marginTop: "1.4vw",
    marginLeft: "9vw",
  },
  c2: {
    marginTop: "1.8vw",
    marginLeft: "1vw",
    height: "2.5vw",
    width: "2.5vw",
    backgroundColor: "Crimson",
    borderRadius: "0.2vw",
  },
  c3: {
    marginTop: "1.8vw",
    marginLeft: "1vw",
    height: "2.5vw",
    width: "2.5vw",
    backgroundColor: "lightblue",
    borderRadius: "0.2vw",
  },
  dash: {
    marginTop: "1.7vw",
    marginLeft: "10vw",
    color: "lightgrey",
  },
  logo: {
    width: "10vw",
    height: "3vw",

    marginTop: "3vw",
    marginLeft: "42vw",
  },
  m11: {
    color: "black",
    textDecoration: "underline",
    fontSize: "0.8vw",
    marginTop: "3vw",
    marginLeft: "37vw",
  },
  m1: {
    color: "rgb(136, 136, 136)",
    textDecoration: "underline",
    fontSize: "0.8vw",
    marginTop: "3vw",
    marginLeft: "37vw",
  },
  m2: {
    color: "rgb(136, 136, 136)",
    // textDecoration: "underline",
    fontSize: "0.8vw",
    marginTop: "3vw",
    marginLeft: "1vw",
  },
  m3: {
    color: "rgb(136, 136, 136)",
    textDecoration: "underline",
    fontSize: "0.8vw",
    marginTop: "3vw",
    marginLeft: "1vw",
  },
  m33: {
    color: "black",
    textDecoration: "underline",
    fontSize: "0.8vw",
    marginTop: "3vw",
    marginLeft: "1vw",
  },
  m4: {
    color: "rgb(136, 136, 136)",
    // /textDecoration: "underline",
    fontSize: "0.8vw",
    marginTop: "3vw",
    marginLeft: "1vw",
  },
  m5: {
    color: "rgb(136, 136, 136)",
    textDecoration: "underline",
    fontSize: "0.8vw",
    marginTop: "3vw",
    marginLeft: "1vw",
  },
  m55: {
    color: "black",
    textDecoration: "underline",
    fontSize: "0.8vw",
    marginTop: "3vw",
    marginLeft: "1vw",
  },
  q1: {
    fontSize: "0.9vw",
    fontWeight: "600",
    marginTop: "2vw",
    marginLeft: "15vw",
  },
  q2: {
    color: "rgb(0, 93, 173);",
    fontSize: "0.9vw",
    textDecoration: "underline",
    marginLeft: "15vw",
    marginTop: "0.5vw",
  },
  q22: {
    color: "rgb(0, 93, 173);",
    fontSize: "0.9vw",
    //textDecoration: "underline",
    marginLeft: "15vw",
    marginTop: "0.5vw",
  },
  q3: {
    color: "rgb(0, 93, 173);",
    fontSize: "0.9vw",
    textDecoration: "underline",
    marginLeft: "1vw",
    marginTop: "0.5vw",
  },
  q33: {
    color: "rgb(0, 93, 173);",
    fontSize: "0.9vw",
    //textDecoration: "underline",
    marginLeft: "1vw",
    marginTop: "0.5vw",
  },
  q4: {
    color: "rgb(0, 93, 173);",
    fontSize: "0.9vw",
    textDecoration: "underline",
    marginLeft: "1vw",
    marginTop: "0.5vw",
  },
  q44: {
    color: "rgb(0, 93, 173);",
    fontSize: "0.9vw",
    //textDecoration: "underline",
    marginLeft: "1vw",
    marginTop: "0.5vw",
  },
  q5: {
    color: "rgb(0, 93, 173);",
    fontSize: "0.9vw",
    textDecoration: "underline",
    marginLeft: "1vw",
    marginTop: "0.5vw",
  },
  q55: {
    color: "rgb(0, 93, 173);",
    fontSize: "0.9vw",

    marginLeft: "1vw",
    marginTop: "0.5vw",
  },
});

export default function Resthome() {
  const classes = useStyles();
  const [m1, setm1] = useState(false);
  const [m3, setm3] = useState(false);
  const [m5, setm5] = useState(false);
  const [q2, setq2] = useState(false);
  const [q3, setq3] = useState(false);
  const [q4, setq4] = useState(false);
  const [q5, setq5] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.display}>
        <div className={classes.h1}> Get exclusive deals on the SLAMN app!</div>
        <div className={classes.h2}> Follow us!</div>
        <div className={classes.h3}>Get ready for your next adventure!</div>
      </div>
      <div className={classes.display}>
        <div className={classes.t1}>
          {" "}
          Download the app for free and get the best <br></br>discounts wherever
          you are!
        </div>
        <div className={classes.t2}>
          {" "}
          Stay tuned and access the latest deals and <br></br>discounts with:
        </div>
        <div className={classes.t3}>
          Find travel inspiration and practical information <br></br> about your
          next trip. Learn about the latest travel <br></br> trends.
        </div>
      </div>

      <div className={classes.display}>
        <div className={classes.display}>
          <div className={classes.app}></div>
          <div className={classes.app2}></div>
        </div>

        <div className={classes.display}>
          <div className={classes.c1}>
            <FacebookIcon style={{ color: "blue", fontSize: "3.4vw" }} />
          </div>

          <div className={classes.c2}>
            {" "}
            <InstagramIcon style={{ color: "white", fontSize: "2.5vw" }} />
          </div>

          <div className={classes.c3}>
            {" "}
            <TwitterIcon style={{ color: "white", fontSize: "2.5vw" }} />
          </div>
        </div>
      </div>
      <div className={classes.dash}>
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      </div>

      <div className={classes.q1}>SLAMN</div>
      <div className={classes.display}>
        <div
          className={q2 == true ? classes.q2 : classes.q22}
          onMouseOver={() => setq2(true)}
          onMouseOut={() => setq2(false)}
        >
          About us
        </div>
        <div
          className={q3 == true ? classes.q3 : classes.q33}
          onMouseOver={() => setq3(true)}
          onMouseOut={() => setq3(false)}
        >
          Help Centre
        </div>
        <div
          className={q4 == true ? classes.q4 : classes.q44}
          onMouseOver={() => setq4(true)}
          onMouseOut={() => setq4(false)}
        >
          Jobs
        </div>
        <div
          className={q5 == true ? classes.q5 : classes.q55}
          onMouseOver={() => setq5(true)}
          onMouseOut={() => setq5(false)}
        >
          Advertising
        </div>
      </div>

      <div className={classes.dash}>
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      </div>

      <div className={classes.logo}>
        <Logo />
      </div>
      <div className={classes.display}>
        <div
          className={m1 == true ? classes.m11 : classes.m1}
          onMouseOver={() => setm1(true)}
          onMouseOut={() => setm1(false)}
        >
          General terms and conditions
        </div>
        <div className={classes.m3}>|</div>
        <div
          className={m3 == true ? classes.m33 : classes.m3}
          onMouseOver={() => setm3(true)}
          onMouseOut={() => setm3(false)}
        >
          Cookies policy
        </div>
        <div className={classes.m4}>|</div>
        <div
          className={m5 == true ? classes.m55 : classes.m5}
          onMouseOver={() => setm5(true)}
          onMouseOut={() => setm5(false)}
        >
          Privacy policy
        </div>
      </div>
    </div>
  );
}
