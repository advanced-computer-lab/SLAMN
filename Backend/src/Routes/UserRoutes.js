const router = require("express").Router();
const FlightServices = require("../Services/FlightServices");
const FlightValidation = require("../Middleware/FlightValidation");
const UserValidation = require("../Middleware/UserValidations");
const UserServices = require("../Services/UserServices");

router
  .route("/deleteReservation")
  .post(UserValidation.validateDeleteFlightReservation, UserServices.deleteReservation);
  
router
  .route("/createReservation")
  .post(UserValidation.validateCreateReservation, UserServices.createFlightReservation);

router
  .route("/createSummary/DepartureNo/ArrivalNo/cabin/seat")
  .post(UserValidation.validateAddSummary, UserServices.createSummary);
router.route("/getSummary").post(UserServices.getSummary);
  
module.exports = router;
const UserValidation = require("../Middleware/UserValidations");
const UserServices = require("../Services/UserServices");
const authentication = require("../Middleware/authentication");
const router = require("express").Router();

router
  .route("/signin")
  .post(UserValidation.validateSignin, UserServices.signIn);

router
  .route("/signup")
  .post(UserValidation.validateSignup, UserServices.signUp);

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

module.exports = router;
