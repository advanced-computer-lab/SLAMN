const mongoose = require("mongoose");
const connectDB = require("./database");
const cors = require("cors");
const admin = require("./api/Controllers/AdminController");
const validateAddFlight = require("./api/Validation/FlightValidation");
const port = 8000;
const express = require("express");
const app = express();
//const jwt = require("jsonwebtoken");

const { appendFile } = require("fs");
app.use(express.json());

app.post("/addFlight", validateAddFlight.validateAddFlight, admin.createFlight);

app.listen(port);

connectDB();
