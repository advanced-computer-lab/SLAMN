import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VerifiedIcon from "@mui/icons-material/Verified";

import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import CardTravelIcon from "@mui/icons-material/CardTravel";
const useStyles = makeStyles({
  root: {
    width: "100%vw",
    height: "25vw",
    background: "#198cfb",
    padding: "0.5vw",
  },
  display: {
    display: "flex",
  },
  title: {
    color: "white",
    marginLeft: "2.5vw",
    marginTop: "3vw",
    fontSize: "1.5vw",
  },
  div2: {
    width: "26vw !important",
    background: "white",

    height: "0.05vw",
    marginTop: "4vw",
    marginLeft: "2.5vw",
  },
  div1: {
    width: "24vw !important",
    background: "white",
    height: "0.03vw",
    marginTop: "4vw",
    marginLeft: "12vw",
  },
  c1: {
    marginTop: "2vw",
    marginLeft: "21vw",
  },
  c2: {
    marginTop: "2vw",
    marginLeft: "23vw",
  },
  c3: {
    marginTop: "2vw",
    marginLeft: "25vw",
  },
  t1: {
    marginTop: "0.5vw",
    marginLeft: "16vw",
    color: "white",
    fontSize: "1.6vw",
    fontWeight: "600",
  },
  t2: {
    marginTop: "0.5vw",
    marginLeft: "13vw",
    color: "white",
    fontSize: "1.6vw",
    fontWeight: "600",
  },
  t3: {
    marginTop: "0.5vw",
    marginLeft: "9vw",
    color: "white",
    fontSize: "1.6vw",
    fontWeight: "600",
  },
  h1: {
    color: "white",
    marginLeft: "12.9vw",
    textAlign: "center",
    marginTop: "1vw",
    fontWeight: "400",
  },
  h2: {
    color: "white",
    marginLeft: "5.5vw",
    textAlign: "center",
    marginTop: "1vw",
    fontWeight: "400",
  },
  h3: {
    fontWeight: "400",
    color: "white",
    marginLeft: "5vw",
    textAlign: "center",
    marginTop: "1vw",
  },
});

export default function Slider() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.display}>
        <div className={classes.div1}> </div>
        <div className={classes.title}>The world's #1 rated travel Airline</div>
        <div className={classes.div2}> </div>
      </div>
      <div className={classes.display}>
        <div className={classes.c1}>
          {" "}
          <CardTravelIcon style={{ color: "#ffd633", fontSize: "5vw" }} />{" "}
        </div>
        <div className={classes.c2}>
          {" "}
          <AirplaneTicketIcon style={{ color: "#ffd633", fontSize: "5vw" }} />
        </div>

        <div className={classes.c3}>
          {" "}
          <VerifiedUserIcon style={{ color: "#ffd633", fontSize: "5vw" }} />
        </div>
      </div>

      <div className={classes.display}>
        <div className={classes.t1}> Hand luggage scanner</div>
        <div className={classes.t2}> Track any flight live</div>
        <div className={classes.t3}> Discount codes specially for the app</div>
      </div>

      <div className={classes.display}>
        <div className={classes.h1}>
          Need to know if your hand luggage will fit on board? <br></br>Scan
          your bag with your phone to check if it fits your <br></br> airline’s
          requirements.
        </div>
        <div className={classes.h2}>
          Everything you need to know about any flight,<br></br> world-wide,
          whether you're on it or not.
        </div>
        <div className={classes.h3}>
          Save even more on your trip by booking in the app <br></br>with our
          exclusive, app-only discount codes.
        </div>
      </div>
    </div>
  );
}
