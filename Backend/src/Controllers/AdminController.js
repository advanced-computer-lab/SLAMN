const Flights = require("../Models/FlightModel");

const createFlight = async (req, res) => {
  try {
    console.log(req.body);
    await Flights.create(req.body);
    return res.json({
      statusCode: 0,
      message: "Success",
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};

module.exports = { createFlight };
