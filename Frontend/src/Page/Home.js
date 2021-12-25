import React from "react";
import NavBar from "../Componenets/General/NavBar";
import UserSearchFlight from "./UserSearchFlight";
import Card from "../Componenets/Home.js/CardAll";
import Signup from "../Componenets/Home.js/Signup";
import Divider from "@mui/material/Divider";
import Deals from "../Componenets/Home.js/DealsAll";
import Search from "../Componenets/Home.js/Searchall";

import { makeStyles } from "@material-ui/core/styles";
import Slider from "../Componenets/Home.js/Slider";
import Rest from "../Componenets/Home.js/Resthome";

const useStyles = makeStyles({
  root: {},
});

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <NavBar />
      <Search />
      <Card />
      <Divider />
      <Signup />

      <Deals />
      <Slider />
      <Rest />
    </div>
  );
}
