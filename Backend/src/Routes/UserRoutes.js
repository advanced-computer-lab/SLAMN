const router = require("express").Router();
//const FlightServices = require("../Services/FlightServices");
//const FlightValidation = require("../Middleware/FlightValidation");
const UserValidation = require("../Middleware/UserValidations");
const UserServices = require("../Services/UserServices");
const authentication = require("../Middleware/authentication");

router
  .route("/deleteReservation")
  .post(
    UserValidation.validateDeleteFlightReservation,
    UserServices.deleteReservation
  );

router
  .route("/createReservation")
  .post(
    UserValidation.validateCreateReservation,
    UserServices.createFlightReservation
  );

router
  .route("/createSummary")
  .post(UserValidation.validateAddSummary, UserServices.createSummary);
router.route("/getSummary").post(UserServices.getSummary);

router
  .route("/updateAccount")
  .post(
    UserValidation.validateUpdateAccount,
    authentication.validateUser,
    UserServices.updateAccount
  );

router.route("/displayaccount").post(
  authentication.validateUser,

  UserServices.displayaccount
);

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
    UserValidation.validatePassword,
    authentication.validateUser,
    UserServices.changePassword
  );

router
  .route("/signin")
  .post(UserValidation.validateSignin, UserServices.signIn);

router
  .route("/signup")
  .post(UserValidation.validateSignup, UserServices.signUp);
router
  .route("/deselectSeats")
  .post(
    authentication.validateUser,
    UserValidation.validateSelection,
    UserServices.deselectSeats
  );
  router
  .route("/sendMail")
  .post( authentication.validateUser,UserServices.sendEmail);

  router
  .route("/getfutureReservation")
  .post(
    authentication.validateUser,
    UserServices.getFutureReservations
  );

router
  .route("/sendMail")
  .post(authentication.validateUser, UserServices.sendEmail);

router
  .route("/getfutureReservation")
  .post(authentication.validateUser, UserServices.getFutureReservations);

module.exports = router;
