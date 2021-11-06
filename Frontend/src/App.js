import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Update from "./Page/Update";
import TextBox from "./Componenets/General/TextBox";
import AdminHome from "../src/Page/AdminHome";
import CreateFlight from "./Page/CreateFlight";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/update" element={<Update />} />
          <Route path="/homeadmin" element={<AdminHome />} />
          <Route path="/addflight" element={<CreateFlight />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
