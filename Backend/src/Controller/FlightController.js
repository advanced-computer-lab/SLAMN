const router = require("express").Router();
const FlightServices = require("../Services/FlightServices");
const FlightValidation = require("../Middleware/FlightValidation");

router
  .route("/")
  .get(FlightServices.getFlights)
  .post(FlightValidation.validateAddFlight, FlightServices.createFlight);
router
  .route("/:id")
  .put(FlightServices.updateFlight)
  .delete(FlightServices.deleteFlight);
router
  .route("/deleteFlight")
  .post(FlightValidation.validateDeleteFlight, FlightServices.deleteFlight);

app.post(
  "/searchFlight",
  validateFlight.validateSearchFlight,
  admin.searchFlight
);
app.post(
  "/showavailableFlight",
  validateFlight.validateShowAvailabeFlight,
  admin.showAvailableFlight
);

module.exports = router;
