import React from "react";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  root: {
    display: "flex",
    background: "white",
    // marginLeft: "2vw",
  },
  circlediv: {
    height: "3vw",
    width: "2vw",
  },
  first: {
    marginLeft: "2.8vw",
    color: "grey",
  },
  first2: {
    marginLeft: "3vw",
    color: "grey",
  },
  second: {
    //  marginLeft: "0.9vw",
    color: "grey",
  },
  second2: {
    //marginLeft: "1.2vw",
    color: "grey",
  },
  children: {
    marginTop: "0.7vw",
    marginLeft: "0.2vw",
    fontSize: "1vw",
    color: "grey",
    fontWeight: "400",
  },
  adult: {
    marginTop: "0.7vw",
    marginLeft: "0.2vw",
    fontSize: "1vw",
    color: "grey",
    fontWeight: "400",
  },

  value1: {
    marginTop: "0.45vw",
    fontSize: "1.5vw",
    marginLeft: "0.3vw",
    color: "grey",
    marginLeft: "0.5vw",
    marginRight: "0.8vw",
  },
  value2: {
    marginTop: "0.7vw",
    fontSize: "1.5vw",
    marginLeft: "0.7vw",
    color: "grey",
    marginRight: "0.7vw",
  },
});

export default function Select(props) {
  const classes = useStyles();
  const [adultNumber, setAdultNumber] = useState(0);
  const [childNumber, setChildNumber] = useState(0);

  const updateList = (list, setPassengersList, type) => {
    var i = 0;
    var found = false;
    var newlist = [];
    for (i; i < list.length; i++) {
      if (list[i].passengerType === type && found === false) {
        found = true;
      } else {
        if (found === true) {
          newlist.push({
            passengerNumber: list[i].passengerNumber - 1,
            passengerType: list[i].passengerType,
            passengerSeat: list[i].passengerSeat,
          });
        } else {
          newlist.push(list[i]);
        }
      }
    }
    setPassengersList(newlist);
  };

  const addPassenger = (setPassengersList, passengerslist, type) => {
    var newlist = [];
    var i = 0;
    for (i; i < passengerslist.length; i++) {
      newlist.push(passengerslist[i]);
    }
    newlist.push({
      passengerNumber: i + 1,
      passengerType: type,
      passengerSeat: "",
    });
    setPassengersList(newlist);
  };

  const handleClickRemoveChild = () => {
    if (childNumber > 0) {
      setChildNumber(childNumber - 1);
      props.setPassengers(props.passengers - 1);
      updateList(props.passengerslist, props.setPassengersList, "Child");
      console.log(props.passengerslist);
    }
  };
  const handleClickAddChild = () => {
    props.setPassengers(props.passengers + 1);
    setChildNumber(childNumber + 1);
    addPassenger(props.setPassengersList, props.passengerslist, "Child");
    console.log(props.passengerslist);
  };

  const handleClickRemoveAdult = () => {
    if (adultNumber > 0) {
      setAdultNumber(adultNumber - 1);
      props.setPassengers(props.passengers - 1);
      updateList(props.passengerslist, props.setPassengersList, "Adult");
      console.log(props.passengerslist);
    }
  };
  const handleClickAddAdult = () => {
    setAdultNumber(adultNumber + 1);
    props.setPassengers(props.passengers + 1);
    addPassenger(props.setPassengersList, props.passengerslist, "Adult");
    console.log(props.passengerslist);
  };

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.adult}> Adults(12+)</div>
        <div className={classes.first}>
          {" "}
          <IconButton onClick={handleClickAddAdult}>
            <AddCircleOutlineRoundedIcon
              style={{
                color: "rgb(0, 93, 173)",
                fontSize: "2vw",
              }}
            />
          </IconButton>
        </div>
        <div
          className={classes.value1}
          style={{
            color: adultNumber === 0 ? "grey" : "rgb(0, 93, 173)",
            fontWeight: "600",
          }}
        >
          {adultNumber}
        </div>
        <div className={classes.second}>
          {" "}
          <IconButton onClick={handleClickRemoveAdult}>
            {" "}
            <RemoveCircleOutlineRoundedIcon
              style={{
                fontSize: "2vw",
                color: adultNumber === 0 ? "grey" : "rgb(0, 93, 173)",
              }}
            />
          </IconButton>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.children}>Children(0-11)</div>
        <div className={classes.first2}>
          {" "}
          <IconButton onClick={handleClickAddChild}>
            {" "}
            <AddCircleOutlineRoundedIcon
              style={{
                color: "rgb(0, 93, 173)",
                fontSize: "2vw",
              }}
            />
          </IconButton>
        </div>
        <div
          className={classes.value2}
          style={{
            color: childNumber === 0 ? "grey" : "rgb(0, 93, 173)",
            fontWeight: "600",
          }}
        >
          {childNumber}
        </div>
        <div className={classes.second2}>
          {" "}
          <IconButton onClick={handleClickRemoveChild}>
            {" "}
            <RemoveCircleOutlineRoundedIcon
              style={{
                color: childNumber === 0 ? "grey" : "rgb(0, 93, 173)",
                fontSize: "2vw",
                fontWeight: "600",
              }}
            />{" "}
          </IconButton>
        </div>
      </div>
    </div>
  );
}
