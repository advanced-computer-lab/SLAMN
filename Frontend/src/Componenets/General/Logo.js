import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Airport from "@mui/icons-material/LocalAirport";

const useStyles = makeStyles({
  root: {
    display: "flex",
    marginTop: "1vw",
    marginLeft: "2vw",
  },
  letter: {
    color: "white",
    fontSize: "2vw",
  },
  airplane: {
    marginTop: "0.2vw",
  },
});

export default function Logo() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.letter}>S</div>

      <div className={classes.letter}>L</div>
      <div>
        <Airport
          className={classes.airplane}
          fontSize="large"
          style={{ color: "#ffd633" }}
        />
      </div>
      <div className={classes.letter}>M</div>
      <div className={classes.letter}>N</div>
    </div>
  );
}
