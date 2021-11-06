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
app.use(express.json());

app.post("/addFlight", validateFlight.validateAddFlight, admin.createFlight);
app.post(
  "/searchFlight",
  validateFlight.validateSearchFlight,
  admin.searchFlight
);
app.post(
  "/showavailableFlight",
  validateFlight.validateShowAvailabeFlight,
  admin.showAvailableFlight
);

app.listen(port);

connectDB();
