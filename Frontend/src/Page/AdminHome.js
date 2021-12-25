import React from "react";
import Buttons from "../Componenets/General/Buttons";
import { makeStyles } from "@material-ui/core/styles";

import { useNavigate } from "react-router-dom";
import NavBar from "../Componenets/General/NavBar2";
import Card from "../Componenets/Home.js/CardAll";
import Signup from "../Componenets/Home.js/Signup";
import Divider from "@mui/material/Divider";
import Deals from "../Componenets/Home.js/DealsAll";
import Search from "../Componenets/Home.js/Searchall";

import Slider from "../Componenets/Home.js/Slider";
import Rest from "../Componenets/Home.js/Resthome";

const useStyles = makeStyles({
  // root: {
  //   display: "flex",
  //   marginTop: "15vw",
  //   marginLeft: "23vw",
  // },
});

export default function AdminHome() {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleCreate = () => {
    // history.push("/addflight");
    navigate("/addflight");
  };
  const handleView = () => {
    // history.push("/viewallflights");
    navigate("/adminsearch");
  };

  return (
    <div className={classes.root}>
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
