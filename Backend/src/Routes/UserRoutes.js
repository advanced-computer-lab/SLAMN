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