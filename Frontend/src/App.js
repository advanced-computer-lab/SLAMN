import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Update from "./Page/UpdateFlight";
import TextBox from "./Componenets/General/TextBox";
import AdminHome from "../src/Page/AdminHome";
import CreateFlight from "./Page/CreateFlight";
import Signin from "../src/Page/Signin";
import DeleteFlight from "../src/Page/DeleteFight";
import ViewAllFlights from "./Page/ViewAllFlights";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/updateflight" element={<Update />} />
          <Route path="/homeadmin" element={<AdminHome />} />
          <Route path="/addflight" element={<CreateFlight />} />
          <Route path="/deleteflight" element={<DeleteFlight />} />
          <Route path="/" element={<Signin />} />
          <Route path="/viewallflights" element={<ViewAllFlights />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
