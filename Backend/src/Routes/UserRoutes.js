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
  .route("/createSummary")
  .post(UserValidation.validateAddSummary, UserServices.createSummary);
router.route("/getSummary").post(UserServices.getSummary);

router
  .route("/updateAccount")
  .post(UserValidation.validateUpdateAccount,UserServices.updateAccount);
  
module.exports = router;