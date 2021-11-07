const router = require("express").Router();
const FlightServices = require("../Services/FlightServices");
const FlightValidation = require("../Middleware/FlightValidation");

router
  .route("/")
  .get(FlightServices.getFlights)
  .post(FlightValidation.validateAddFlight, FlightServices.createFlight);
router
  .route("/updateFlight")
  .put(FlightServices.updateFlight)
  .delete(FlightServices.deleteFlight);
router
  .route("/deleteFlight")
  .post(FlightValidation.validateDeleteFlight, FlightServices.deleteFlight);

// app.post(
//   "/searchFlight",
//   validateFlight.validateSearchFlight,
//   admin.searchFlight
// );
// app.post(
//   "/showavailableFlight",
//   validateFlight.validateShowAvailabeFlight,
//   admin.showAvailableFlight
// );
router
  .route("/:id")
  .put(FlightServices.updateFlight)
  .delete(FlightServices.deleteFlight);
// router
//   .route("/deleteFlight")
//   .post(FlightValidation.validateDeleteFlight, FlightServices.deleteFlight);

router
  .route("/searchFlight")
  .post(FlightValidation.validateSearchFlight, FlightServices.searchFlight);

router.route("/getflights").post(FlightServices.getFlights);

module.exports = router;
