const Flights = require("../Models/FlightModel");

const getFlights = async (req, res) => {
  Flights.find()
    .then((flights) => res.json(flights))
    .catch((err) => res.status(400).json("Error:" + err));
};

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
const deleteFlight = async (req, res) => {
  //blah blah blah
};

const updateFlight = async (req, res) => {
  const { id } = req.params;
  const FlightNumber = req.body.FlightNumber;
  const DepartureDate = req.body.DepartureDate;
  const ArrivalDate = req.body.ArrivalDate;
  const EconomySeats = req.body.EconomySeats;
  const BusinessSeats = req.body.BusinessSeats;
  const Airport = req.body.Airport;
  Flights.updateOne(
    { _id: id },
    {
      $set: {
        FlightNumber,
        DepartureDate,
        ArrivalDate,
        EconomySeats,
        BusinessSeats,
        Airport,
      },
    }
  )
    .then(() => res.json("Flight updated"))
    .catch((err) => res.status(400).json("Error:" + err));
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

module.exports = {
  createFlight,
  updateFlight,
  getFlights,
  deleteFlight,
  searchFlight,
  showAvailableFlight,
};
