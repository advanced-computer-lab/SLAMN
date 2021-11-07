import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Update from "./Page/Update";
import TextBox from "./Componenets/General/TextBox";
import ViewAllFlights from "./Page/ViewAllFlights";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewAllFlights />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
