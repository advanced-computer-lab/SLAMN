import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Divider from "@mui/material/Divider";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

const useStyles = makeStyles({
  root: {
    marginTop: "1vw",
    marginLeft: "2vw",
    backgroundColor: "white",
    width: "60vw",
    height: "32vw",
    padding: "0.5vw",
    borderRadius: "0.5vw !important",
    boxShadow: "1px 1.6px 1px #9E9E9E",
  },
  block: {
    width: "60.5vw",
    height: "0.2vw",
    backgroundColor: "#ffd633 !important",
  },
  display: {
    display: "flex",
  },
  flight: {
    color: "#aaa",
    marginTop: "1vw",
    fontSize: "1.5vw",
    marginLeft: "1vw",
  },

  dep: { fontSize: "0.9vw", marginTop: "1.2vw", marginLeft: "0.5vw" },
  depicon: { marginTop: "1vw", marginLeft: "1vw" },
  tim1dep: {
    fontWeight: "600",
    marginTop: "1.5vw",
    fontSize: "1.5vw",
    marginLeft: "1vw",
  },
  tim1arrival: {
    fontWeight: "600",
    marginTop: "1.5vw",
    fontSize: "1.5vw",
    marginLeft: "1vw",
  },
  count1dep: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "1.5vw",
    fontSize: "1.5vw",
  },
  count1arrival: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "1.5vw",
    fontSize: "1.5vw",
  },
  tim2dep: {
    fontWeight: "600",
    marginTop: "1.3vw",
    marginLeft: "20vw",
    fontSize: "1.5vw",
  },
  tim2arrival: {
    fontWeight: "600",
    marginTop: "1.5vw",
    marginLeft: "20vw",
    fontSize: "1.5vw",
  },
  count2dep: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "1.5vw",
    fontSize: "1.3vw",
  },
  count2arrival: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "1.5vw",
    fontSize: "1.5vw",
  },
  dep1info: {
    color: "#666",
    fontSize: "0.9vw",
    marginLeft: "1vw",
  },
  arrival1info: {
    color: "#666",
    fontSize: "0.9vw",
    marginLeft: "1vw",
  },

  dep12info: {
    color: "#666",
    fontSize: "0.9vw",
    marginLeft: "20vw",
  },

  arrival12info: {
    color: "#666",
    fontSize: "0.9vw",
    marginLeft: "20vw",
  },

  divider: {
    marginTop: "1.5vw !important",
    height: "2vw !important",
  },

  arrival: { fontSize: "0.9vw", marginTop: "1.2vw", marginLeft: "0.5vw" },
  arrivalicon: { marginTop: "1vw", marginLeft: "1vw" },
  depclass: {
    color: "#666",
    fontSize: "0.9vw",
    marginTop: "1.2vw",
    marginLeft: "45vw",
  },
  depprice: {
    color: "#666",
    fontSize: "0.9vw",
    //marginTop: "1.6vw",
    marginLeft: "52.6vw",
  },
  arrivalprice: {
    color: "#666",
    fontSize: "0.9vw",
    //marginTop: "1.6vw",
    marginLeft: "52.8vw",
  },
  arrivalclass: {
    color: "#666",
    fontSize: "0.9vw",
    marginTop: "1.2vw",
    marginLeft: "46.7vw",
  },
  ticketicon: { marginLeft: "54vw", marginTop: "0.4vw" },

  priceTotal: { fontWeight: "600", marginTop: "0.5vw", marginLeft: "50vw" },
});

export default function Summary() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.block}></div>
      <div className={classes.display}>
        <div className={classes.flight}>flight</div>
        <AirplaneTicketIcon
          className={classes.ticketicon}
          style={{ color: "#005dad" }}
        />
      </div>
      <div className={classes.display}>
        <FlightTakeoffIcon
          className={classes.depicon}
          style={{ color: "#005dad" }}
        />
        <div className={classes.dep}>Departure</div>
        <div className={classes.depclass}>Economy</div>
      </div>
      <div className={classes.depprice}>$7.50</div>
      <div className={classes.display}>
        <div>
          <div className={classes.display}>
            <div className={classes.tim1dep}>08:15</div>
            <div className={classes.count1dep}> CAI</div>
          </div>

          <div className={classes.dep1info}>Thu, 09 Dec</div>
          <div className={classes.dep1info}>Cairo International Airport </div>
        </div>

        <div>
          <div className={classes.display}>
            <div className={classes.tim2dep}>08:15</div>
            <div className={classes.count2dep}> CAI</div>
          </div>
          <div className={classes.dep12info}>Thu, 09 Dec</div>
          <div className={classes.dep12info}>Cairo International Airport </div>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.display}>
        <FlightLandIcon
          className={classes.arrivalicon}
          style={{ color: "#005dad" }}
        />
        <div className={classes.arrival}>Return</div>
        <div className={classes.arrivalclass}>Economy</div>
      </div>
      <div className={classes.arrivalprice}>$3.55</div>
      <div className={classes.display}>
        <div>
          <div className={classes.display}>
            <div className={classes.tim1arrival}>08:15</div>
            <div className={classes.count1arrival}> CAI</div>
          </div>

          <div className={classes.arrival1info}>Thu, 09 Dec</div>
          <div className={classes.arrival1info}>
            Cairo International Airport{" "}
          </div>
        </div>

        <div>
          <div className={classes.display}>
            <div className={classes.tim2arrival}>08:15</div>
            <div className={classes.count2arrival}> CAI</div>
          </div>
          <div className={classes.arrival12info}>Thu, 09 Dec</div>
          <div className={classes.arrival12info}>
            Cairo International Airport{" "}
          </div>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.priceTotal}>Total price : $10.00 </div>
    </div>
  );
}
