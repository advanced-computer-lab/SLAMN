import React from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  circlediv: {
    height: "3vw",
    width: "2vw",
  },
  first: {
    marginLeft: "3vw",
  },
  first2: {
    marginLeft: "1.6vw",
  },
  second: {
    marginLeft: "0.9vw",
  },
  second2: {
    marginLeft: "0.9vw",
  },
  children: { marginTop: "0.7vw", fontSize: "1.3vw" },
  adult: { marginTop: "0.7vw", fontSize: "1.3vw" },

  value1: { marginTop: "0.45vw", fontSize: "1.5vw", marginLeft: "0.5vw" },
  value2: { marginTop: "0.45vw", fontSize: "1.5vw", marginLeft: "0.5vw" },
});

export default function Select() {
  const classes = useStyles();
  const [adultNumber, setAdultNumber] = useState(0);
  const [childNumber, setChildNumber] = useState(0);

  const handleClickRemoveChild = () => {
    if (childNumber > 0) {
      setChildNumber(childNumber - 1);
    }
  };
  const handleClickAddChild = () => {
    setChildNumber(childNumber + 1);
  };

  const handleClickRemoveAdult = () => {
    if (adultNumber > 0) {
      setAdultNumber(adultNumber - 1);
    }
  };
  const handleClickAddAdult = () => {
    setAdultNumber(adultNumber + 1);
  };

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.adult}> Adults(12+)</div>
        <div className={classes.first}>
          {" "}
          <IconButton onClick={handleClickAddAdult}>
            <AddIcon />
          </IconButton>
        </div>
        <div className={classes.value1}>{adultNumber}</div>
        <div className={classes.second}>
          {" "}
          <IconButton onClick={handleClickRemoveAdult}>
            {" "}
            <RemoveIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.children}>Children(0-11)</div>
        <div className={classes.first2}>
          {" "}
          <IconButton onClick={handleClickAddChild}>
            {" "}
            <AddIcon />{" "}
          </IconButton>
        </div>
        <div className={classes.value2}>{childNumber}</div>
        <div className={classes.second2}>
          {" "}
          <IconButton onClick={handleClickRemoveChild}>
            {" "}
            <RemoveIcon />{" "}
          </IconButton>
        </div>
      </div>
    </div>
  );
}
