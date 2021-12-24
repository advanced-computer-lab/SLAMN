import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Home.js/Card";
import Card2 from "../Home.js/Card2";
import Card3 from "../Home.js/Card3";

import WorkIcon from "@mui/icons-material/Work";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import CheckIcon from "@mui/icons-material/Check";
const useStyles = makeStyles({
  root: {
    background: "rgb(244, 243, 239)",

    //marginTop: "30vw",
    // backgroundColor: "black",
    height: "15vw",
    width: "100% ",
  },
  display: {
    display: "flex",
  },
  c1: {
    marginTop: "2vw",
    marginLeft: "13vw",
  },
  c2: {
    marginTop: "2vw",
    marginLeft: "2vw",
  },
  c3: {
    marginTop: "2vw",
    marginLeft: "2vw",
  },
  book: {
    fontWeight: "700",
    marginTop: "3vw",
    marginLeft: "40vw",
    fontSize: "1.2vw",
  },
  t1: {
    fontSize: "0.8vw",
    fontWeight: "500",
    marginLeft: "0.2vw",
    marginTop: "1.2vw ",
  },
  ct1: {
    marginLeft: "24vw",
    marginTop: "1.2vw ",
  },
  t2: {
    fontSize: "0.8vw",
    fontWeight: "500",
    marginLeft: "0.2vw",
    marginTop: "1.2vw ",
  },
  ct2: {
    marginLeft: "2vw",
    marginTop: "1.2vw ",
  },
  t3: {
    fontSize: "0.8vw",
    fontWeight: "500",
    marginLeft: "0.2vw",
    marginTop: "1.2vw ",
  },
  ct3: {
    marginLeft: "2vw",
    marginTop: "1.2vw ",
  },
});

export default function CardAll() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.display}>
        <div className={classes.c1}>
          {" "}
          <Card3 />
        </div>
        <div className={classes.c2}>
          {" "}
          <Card
            title="Check refund status"
            content="Do you have a refund currently in progress? check its status"
            icon={<PriceCheckIcon style={{ color: "#005dad" }} />}
          />
        </div>
        <div className={classes.c3}>
          {" "}
          <Card2 />
        </div>
      </div>

      <div className={classes.book}>
        Book your holidays and find travel offers
      </div>

      <div className={classes.display}>
        <div className={classes.display}>
          <div className={classes.ct1}>
            <CheckIcon style={{ color: "green" }} fontSize="small" />
          </div>
          <div className={classes.t1}>
            {" "}
            More flight combinations than anyone else
          </div>
        </div>
        <div className={classes.display}>
          <div className={classes.ct2}>
            <CheckIcon style={{ color: "green" }} fontSize="small" />
          </div>
          <div className={classes.t2}> Free rebooking on many flights</div>
        </div>
        <div className={classes.display}>
          <div className={classes.ct3}>
            <CheckIcon style={{ color: "green" }} fontSize="small" />
          </div>
          <div className={classes.t3}>
            {" "}
            We compare millions of hotels and accommodation
          </div>
        </div>
      </div>
    </div>
  );
}
