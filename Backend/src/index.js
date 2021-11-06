const mongoose = require("mongoose");
const connectDB = require("./database");
const cors = require("cors");
const admin = require("./api/Controllers/AdminController");
const validateFlight = require("./api/Validation/FlightValidation");
const port = 8000;
const express = require("express");
const app = express();
//const jwt = require("jsonwebtoken");

const { appendFile } = require("fs");
app.use(cors());
app.use(express.json());

app.post("/addFlight", validateFlight.validateAddFlight, admin.createFlight);
app.post("/deleteFlight", validateFlight.validateDeleteFlight, admin.deleteFlight);


app.listen(port);

connectDB();
