const connectDB = require("./database");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;
const FlightRouter = require("./Routes/FlightRoutes");
const UserRouter = require("./Routes/UserRoutes");
connectDB();
app.use(cors({}));
app.use(express.json());
app.use("/flights", FlightRouter);
app.use("/users", UserRouter);

app.listen(port);
