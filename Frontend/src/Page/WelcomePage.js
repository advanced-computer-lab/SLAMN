import React from "react";
import Buttons from "../Componenets/General/Buttons";
import Navbar from "../Componenets/General/NavBar";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({}));

const handleView = () => {
  window.location = "/signin";
};

export default function WelcomePage() {
  return (
    <div>
      <Navbar />
      <h1> Welcome to SLAMNAirline </h1>

      <Buttons size="small" title="Sign in" onClick={handleView} />
    </div>
  );
}
