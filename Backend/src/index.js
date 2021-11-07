const connectDB = require("./database");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;
const FlightController = require("./Controller/FlightController");
connectDB();
app.use(cors({}));
app.use(express.json());
app.use("/flights", FlightController);

app.listen(port);
