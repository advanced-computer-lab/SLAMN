const router = require("express").Router();
//const FlightServices = require("../Services/FlightServices");
//const FlightValidation = require("../Middleware/FlightValidation");
const UserValidation = require("../Middleware/UserValidations");
const UserServices = require("../Services/UserServices");
const authentication = require("../Middleware/authentication");

router.route("/pay").post(UserServices.Pay);

router
  .route("/deleteReservation")
  .post(
    UserValidation.validateDeleteFlightReservation,
    authentication.validateUser,
    UserServices.deleteReservation
  );

router
  .route("/createReservation")
  .post(
    UserValidation.validateCreateReservation,
    authentication.validateUser,
    UserServices.createFlightReservation
  );

router
  .route("/createSummary")
  .post(
    UserValidation.validateAddSummary,
    authentication.validateUser,
    UserServices.createSummary
  );

router.route("/getSummary").post(authentication.validateUser,UserServices.getSummary);

router
  .route("/updateAccount")
  .post(
    UserValidation.validateUpdateAccount,
    authentication.validateUser,
    UserServices.updateAccount
  );

  router
  .route("/updateSamedepartureReservation")
  .post(
    UserValidation.validateUpdateSameDepartureReservation,
    authentication.validateUser,
    UserServices.updateSameDepartureFlightReservation
  );
  router
  .route("/updateSameArrivalReservation")
  .post(
    UserValidation.validateUpdateSameArrivalReservation,
    authentication.validateUser,
    UserServices.updateSameArrivalFlightReservation
  );

  router
  .route("/updateDiffReturnReservation")
  .post(
    UserValidation.validateupdateDiffReturnReservation,
    authentication.validateUser,
    UserServices.updateDiffReturnFlightReservation
  );
  router
  .route("/updateDiffDepartureReservation")
  .post(
    UserValidation.validateupdateDiffDepartureReservation,
    authentication.validateUser,
    UserServices.updateDiffDepartureFlightReservation
  );


router
  .route("/displayaccount")
  .post(authentication.validateUser, UserServices.displayaccount);

router
  .route("/changepassword")
  .post(
    authentication.validateUser,
    UserValidation.validatePassword,
    UserServices.changePassword
  );
router
  .route("/signup")
  .post(UserValidation.validateSignup, UserServices.signUp);

router
  .route("/viewAvailableSeats")
  .post(
    UserValidation.validateSeats,
    authentication.validateUser,
    UserServices.viewAvailableSeats
  );

router
  .route("/signin")
  .post(UserValidation.validateSignin, UserServices.signIn);

router
  .route("/deselectSeats")
  .post(
    authentication.validateUser,
    UserValidation.validateSelection,
    UserServices.deselectSeats
  );
router
  .route("/sendMail")
  .post(authentication.validateUser, UserServices.sendEmail);

router
  .route("/getfutureReservation")
  .post(authentication.validateUser, UserServices.getFutureReservations);

module.exports = router;
