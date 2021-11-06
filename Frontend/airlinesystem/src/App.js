import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Update from "./Page/Update";
import TextBox from "./Componenets/General/TextBox";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
