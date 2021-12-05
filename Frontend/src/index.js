import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserSearchFlight from "./Page/UserSearchFlight";
import ViewAllFlights from "./Page/ViewAllFlights";
import Card from "../src/Componenets/ViewFlights/Card";
import Summary from "../src/Componenets/Reservation/Summary";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
