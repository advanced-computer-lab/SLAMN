import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Update from "./Page/Update";
import TextBox from "./Componenets/General/TextBox";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/update" component={Update} exact />
        <Route path="/" component={Update} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
