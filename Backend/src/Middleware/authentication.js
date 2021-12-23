const jwt = require("jsonwebtoken");
require("dotenv").config;

const validateUser = (req, res, next) => {
  const token = req.headers["auth"];
  console.log(token,"tokeeeeeen");
  if (!token) {
    console.log("dakhaaaaal");
    return res.json({
      statusCode: 1,
      error: "Unauthorised User",
    });
  }
  else{
    console.log("madakhalshhhhh");
  }
  const resp = jwt.verify(token, process.env.SECRET);
  req.payload = resp;
  next();
};

module.exports = { validateUser };
