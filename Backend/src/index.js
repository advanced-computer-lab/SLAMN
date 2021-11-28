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

const AdminRouter = require("./Routes/AdminRoutes");
app.use("/flights", AdminRouter);
const UserRouter = require("./Routes/UserRoutes");
app.use("/users", UserRouter);
connectDB();

app.listen(port);
