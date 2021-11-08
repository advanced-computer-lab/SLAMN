const router = require("express").Router();
const FlightServices = require("../Services/FlightServices");
const FlightValidation = require("../Middleware/FlightValidation");
const UserValidation = require("../Middleware/UserValidations");
const UserServices = require("../Services/UserServices");

router
  .route("/")
  .get(FlightServices.getFlights)
  .post(FlightValidation.validateAddFlight, FlightServices.createFlight);

router.route("/updateFlight").post(FlightServices.updateFlight);

router
  .route("/deleteFlight")
  .post(FlightValidation.validateDeleteFlight, FlightServices.deleteFlight);

router
  .route("/searchFlight")
  .post(FlightValidation.validateSearchFlight, FlightServices.searchFlight);

router
  .route("/signin")
  .post(UserValidation.validateSignin, UserServices.signIn);

router.route("/getflights").post(FlightServices.getFlights);

module.exports = router;
