import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Update from "./Page/Update";
import TextBox from "./Componenets/General/TextBox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/update" component={Update} exact />
        <Route path="/" component={Update} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
