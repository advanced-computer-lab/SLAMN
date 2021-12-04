import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserSearchFlight from "./Page/UserSearchFlight";
import ViewAllFlights from "./Page/ViewAllFlights";

ReactDOM.render(
  <React.StrictMode>
    <UserSearchFlight />
  </React.StrictMode>,
  document.getElementById("root")
);
