import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Update from "./Page/Update";
import TextBox from "./Componenets/General/TextBox";
import CreateFlight from "./Page/CreateFlight";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Update />} />
          <Route path="/addFlight" element={<CreateFlight />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
