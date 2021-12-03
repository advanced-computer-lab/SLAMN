import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Divider from "@mui/material/Divider";
import Button from "../AccountDetails/Buttons";

const useStyles = makeStyles({
  root: {
    marginTop: "1vw",
    marginLeft: "2vw",
    backgroundColor: "white",
    width: "50vw",
    height: "20vw",
    padding: "0.5vw",
    borderRadius: "0.5vw !important",
    boxShadow: "1px 1.6px 1px #9E9E9E",
  },
  block: {
    width: "51vw",
    marginLeft: "-0.5vw",
    height: "0.2vw",
    backgroundColor: "#ffd633 !important",
    borderRadius: "0.5vw !important",
    marginTop: "-0.5vw",
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

  dep: {
    fontSize: "0.9vw",
    marginTop: "0.5vw",
    marginLeft: "0.5vw",
    fontWeight: "600",
  },
  depicon: { marginTop: "0.5vw", marginLeft: "1vw" },
  tim1dep: {
    fontWeight: "600",
    marginTop: "0.5vw",
    fontSize: "1.5vw",
    marginLeft: "1vw",
  },
  tim1arrival: {
    fontWeight: "600",
    marginTop: "0.5vw",
    fontSize: "1.5vw",
    marginLeft: "1vw",
  },
  count1dep: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "0.5vw",
    fontSize: "1.5vw",
  },
  count1arrival: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "0.5vw",
    fontSize: "1.5vw",
  },
  tim2dep: {
    fontWeight: "600",
    marginTop: "0.5vw",
    marginLeft: "20vw",
    fontSize: "1.5vw",
  },
  tim2arrival: {
    fontWeight: "600",
    marginTop: "0.4vw",
    marginLeft: "20vw",
    fontSize: "1.5vw",
  },
  count2dep: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "0.5vw",
    fontSize: "1.5vw",
  },
  count2arrival: {
    fontWeight: "600",
    marginLeft: "1vw",
    marginTop: "0.4vw",
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
    marginTop: "-0.2vw !important",
    height: "2vw !important",
    fontWeight: "100 !important",
  },

  arrival: {
    fontSize: "0.9vw",
    marginTop: "0.5vw",
    marginLeft: "0.5vw",
    fontWeight: "600",
  },
  arrivalicon: { marginTop: "0.5vw", marginLeft: "1vw" },

  button: {
    width: "2vw !important",
    height: "2vw  !important",
    marginLeft: "20vw",
  },
});

export default function Card() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.block}></div>
      <div className={classes.flight}>flight</div>
      <div className={classes.display}>
        <FlightTakeoffIcon
          className={classes.depicon}
          style={{ color: "#005dad" }}
        />
        <div className={classes.dep}>Departure</div>
      </div>
      <div className={classes.display}>
        <div>
          <div className={classes.display}>
            <div className={classes.tim1dep}>08:15</div>
            <div className={classes.count1dep}> CAI</div>
          </div>

          <div className={classes.dep1info}>Thu, 09 Dec</div>
        </div>

        <div>
          <div className={classes.display}>
            <div className={classes.tim2dep}>08:15</div>
            <div className={classes.count2dep}> CAI</div>
          </div>
          <div className={classes.dep12info}>Thu, 09 Dec</div>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.display}>
        <FlightLandIcon
          className={classes.arrivalicon}
          style={{ color: "#005dad" }}
        />
        <div className={classes.arrival}>Arrival</div>
      </div>
      <div className={classes.display}>
        <div>
          <div className={classes.display}>
            <div className={classes.tim1arrival}>08:15</div>
            <div className={classes.count1arrival}> CAI</div>
          </div>

          <div className={classes.arrival1info}>Thu, 09 Dec</div>
        </div>

        <div>
          <div className={classes.display}>
            <div className={classes.tim2arrival}>08:15</div>
            <div className={classes.count2arrival}> CAI</div>
          </div>
          <div className={classes.arrival12info}>Thu, 09 Dec</div>
        </div>
      </div>
      <Button ClassName={classes.button} title={"Select"} />
    </div>
  );
}
