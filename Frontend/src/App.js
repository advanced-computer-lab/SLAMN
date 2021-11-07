import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Update from "./Page/UpdateFlight";
import TextBox from "./Componenets/General/TextBox";
<<<<<<< HEAD
import AdminHome from "../src/Page/AdminHome";
import CreateFlight from "./Page/CreateFlight";
import Signin from "../src/Page/Signin";
import DeleteFlight from "../src/Page/DeleteFight";
=======
import ViewAllFlights from "./Page/ViewAllFlights";
>>>>>>> 2d16537ba742840c6da14d0cfe90ff9fe6c56e43

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/updateflight" element={<Update />} />
          <Route path="/homeadmin" element={<AdminHome />} />
          <Route path="/addflight" element={<CreateFlight />} />
          <Route path="/deleteflight" element={<DeleteFlight />} />
          <Route path="/" element={<Signin />} />
=======
          <Route path="/" element={<ViewAllFlights />} />
>>>>>>> 2d16537ba742840c6da14d0cfe90ff9fe6c56e43
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
