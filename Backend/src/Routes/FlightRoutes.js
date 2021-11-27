const router = require("express").Router();
const FlightServices = require("../Services/FlightServices");
const FlightValidation = require("../Middleware/FlightValidation");
const UserValidation = require("../Middleware/UserValidations");
const UserServices = require("../Services/UserServices");
const authentication = require("../Middleware/authentication");

router
  .route("/")
  .get(FlightServices.getFlights)
  .post(
    authentication.validateUser,
    FlightValidation.validateAddFlight,
    FlightServices.createFlight
  );

router.route("/updateFlight").post(FlightServices.updateFlight);

router
  .route("/deleteFlight")
  .post(
    authentication.validateUser,
    FlightValidation.validateDeleteFlight,
    FlightServices.deleteFlight
  );

router
  .route("/searchFlight")
  .post(
    authentication.validateUser,
    FlightValidation.validateSearchFlight,
    FlightServices.searchFlight
  );

router
  .route("/signin")
  .post(UserValidation.validateSignin, UserServices.signIn);

router
  .route("/viewAvailableSeats")
  .post(
    authentication.validateUser,
    UserValidation.validateSeats,
    UserServices.viewAvailableSeats
  );

router
  .route("/selectSeats")
  .post(
    authentication.validateUser,
    UserValidation.validateSelection,
    UserServices.selectSeats
  );

router
  .route("/deselectSeats")
  .post(
    authentication.validateUser,
    UserValidation.validateDeselection,
    UserServices.deselectSeats
  );

router.route("/getflights").post(FlightServices.getFlights);

module.exports = router;
