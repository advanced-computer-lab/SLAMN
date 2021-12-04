import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "20vw",
    height: "3vw",
    backgroundColor: "white",
    placeContent: "space-between",
    alignItems: "center",
    borderRadius: "0.5vw",
    borderBottom: "groove",
    marginBottom: "1vw",
    marginLeft: "1vw",
  },
  passengerNumber: {
    fontSize: "1vw",
    fontWeight: "500",
    marginLeft: "0.5vw",
  },
  passengerType: {
    fontSize: "0.8vw",
  },
  seatEmpty: {
    fontSize: "1vw",
    height: "2vw",
    width: " 3vw !important",
    background: "#fff",
    border: " 1px solid #ccc",
    borderRadius: "0.3vw",
    position: "relative",
    right: "1vw",
    textAlign: "center",
  },
  seatSelected: {
    fontSize: "1vw",
    height: "2vw",
    width: " 3vw !important",
    background: "#fff",
    border: " 1px solid #ccc",
    borderRadius: "0.3vw",
    position: "relative",
    right: "1vw",
    textAlign: "center",
  },
}));

export default function Passenger(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.passengerNumber}>
          Passenger {props.passengerNumber}
        </div>
        <div className={classes.passengerType}> {props.passengerType} </div>
        <div>
          {props.passengerSeat === "" ? (
            <div className={classes.seatEmpty}>..</div>
          ) : (
            <div className={classes.seatSelected}>{props.passengerSeat}</div>
          )}
        </div>
      </div>
    </div>
  );
}
