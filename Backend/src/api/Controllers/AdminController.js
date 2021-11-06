const FlightModel = require("/ACL/SLAMN/Backend/src/Models/FlightModel");

const createFlight = async (req, res) => {
  try {
    console.log(req.body);
    await FlightModel.create(req.body);
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
const searchFlight = async (req, res) => {
  try {
    const data = await FlightModel.find(
      req.body
      // DepartureDate: req.body.DepartureDate,
      // ArrivalDate: req.body.ArrivalDate,
      // EconomySeats: req.body.EconomySeats,
      // BusinessSeats: req.body.BusinessSeats,
      // Airport: req.body.Airport,
    );
    return res.json({
      statusCode: 0,
      message: "Success",
      data: data,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};
const showAvailableFlight = async (req, res) => {
  try {
    const data = await FlightModel.find();
    return res.json({
      statusCode: 0,
      message: "Success",
      data: data,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};
module.exports = { createFlight, searchFlight, showAvailableFlight };
