const mongoose = require("mongoose");
const connectDB = require("./database");
const cors = require("cors");
const adminController = require("./Controllers/AdminController");
const FlightValidation = require("./Validation/FlightValidation");
const port = 8000;
const express = require("express");
const app = express();
//const jwt = require("jsonwebtoken");

const { appendFile } = require("fs");

app.post(
  "/addFlight",
  FlightValidation.validateAddFlight,
  adminController.createFlight
);
app.use(express.json());
app.listen(port);

connectDB();
