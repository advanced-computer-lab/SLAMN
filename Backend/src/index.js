const connectDB = require("./database");
const express = require("express");
const cors = require("cors");
const UserRouter = require("./Routes/UserRoutes");
const AdminRouter = require("./Routes/AdminRoutes");
const app = express();
const port = 8000;
<<<<<<< HEAD
=======

>>>>>>> db0d7211c11f8e6eb77c2b07001dfaa4d600f052

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
<<<<<<< HEAD
=======



connectDB();
app.use(cors({}));
app.use(express.json());



>>>>>>> db0d7211c11f8e6eb77c2b07001dfaa4d600f052

app.listen(port);
