import React from "react";
import UserSearchFlight from "../../Page/UserSearchFlight";

import { makeStyles } from "@material-ui/core/styles";
import { fabClasses } from "@mui/material";
import Search from "../../Page/UserSearchFlight";
import tom from "../Home.js/images/city.png";

const useStyles = makeStyles({
  root: {
    width: "100%vw",
    height: "30vw",
    backgroundColor: "blue ",
    padding: "2vw",
    backgroundImage: `url(${tom})`,
    backgroundSize: "100%",
  },
  search: {
    color: "white ",
    fontSize: "1.5vw",
    fontWeight: "600",
    marginTop: "7vw",
    marginLeft: "10vw",
  },
  search1: {
    marginTop: "2vw",
    marginLeft: "10vw",
  },
});

export default function Searchall() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.search}> Search.Book.Travel</div>
      <div className={classes.search1}>
        <Search />
      </div>
    </div>
  );
}
