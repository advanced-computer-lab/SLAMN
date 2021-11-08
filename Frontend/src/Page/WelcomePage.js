import React from "react";
import Buttons from "../Componenets/General/Buttons";

const handleView = () => {
  window.location = "/signin";
};

export default function WelcomePage() {
  return (
    <div>
      <h1> Welcome to SLAMNAirline </h1>

      <Buttons size="small" title="Sign in" onClick={handleView} />
    </div>
  );
}
