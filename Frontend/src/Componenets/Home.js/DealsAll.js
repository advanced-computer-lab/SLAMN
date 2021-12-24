import React from "react";
import Deals from "../Home.js/Deals";
import Deals2 from "../Home.js/Deals2";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%vw",
    height: "25vw",

    background: "rgb(244, 243, 239)",
    marginTop: "3vw !important",
    padding: "2vw",
  },
  display: { display: "flex" },

  deal1: {
    marginTop: "2vw",
    marginLeft: "5vw",
  },
  deal2: {
    marginTop: "2vw",
    marginLeft: "5vw !important",
  },
  deals: {
    // marginTop: "0.5vw",
    marginLeft: "21.8vw",
    fontSize: "2vw",
  },
});

export default function DealsAll() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.deals}>Our best flight deals!</div>
        <div className={classes.display}>
          <div>
            <Deals className={classes.deal1} />
          </div>
          <div>
            <Deals2 className={classes.deal2} />
          </div>
        </div>
      </div>
    </div>
  );
}
