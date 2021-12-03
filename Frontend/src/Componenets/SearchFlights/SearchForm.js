import React from "react";
import TextBox from "../Componenets/General/TextBox";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import arrows from "@mui/icons-material/CompareArrows";
import circle from "@mui/icons-material/CircleOutlined";
import location from "@mui/icons-material/LocationOn";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  circlediv: {
    height: "3vw",
    width: "2vw",
  },
  first: {
    backgroundRepeat: "no-repeat",
    // backgroundImage: `url(${arrows})`,
    backgroundImage: { circle },
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "2vw",
    width: "2vw",
    marginTop: "2vw",
  },
});

export default function SearchForm() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        {" "}
        <TextBox title="Leaving from" />
      </div>
      <div>
        <IconButton className={classes.first}>
          {" "}
          <circle />
        </IconButton>
      </div>
      <div>
        {" "}
        <TextBox title="Going to" />
      </div>
      <div>
        <TextBox title="Departure" />
      </div>
      <div>
        <TextBox title="Return" />
      </div>
    </div>
  );
}
