const connectDB = require("./database");
const express = require("express");
const cors = require("cors");
const UserRouter = require("./Routes/UserRoutes");
const AdminRouter = require("./Routes/AdminRoutes");
const app = express();
const port = 5000;

require("dotenv").config();
const jwt = require("jsonwebtoken");

app.use(
  cors({
    exposedHeaders: "auth",
  })
);
app.use(express.json());

app.use("/users", UserRouter);
app.use("/flights", AdminRouter);

connectDB();

app.listen(port);
