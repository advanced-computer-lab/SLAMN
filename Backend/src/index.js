const connectDB = require("./database");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;

require("dotenv").config();
const jwt = require("jsonwebtoken");

app.use(
  cors({
    exposedHeaders: "auth",
  })
);
app.use(express.json());

const FlightRouter = require("./Routes/FlightRoutes");
app.use("/flights", FlightRouter);
connectDB();

app.listen(port);
