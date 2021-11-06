const Flights = require("../../Models/Flight");

const deleteFlight = async (req, res) => {
  try {
    const flightToBeDeleted = await Flights.findOne({
      FlightNumber:req.body.FlightNumber
    })
    console.log(flightToBeDeleted)
    flightToBeDeleted.delete()
    return res.json({
      statusCode: 0,
      message: 'Success',
    })
  } catch (exception) {
    return res.json({
      statusCode: 1,
      error: 'Exception',
    })
  }
}

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

module.exports = {deleteFlight, createFlight };


