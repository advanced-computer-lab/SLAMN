const Flights = require("../Models/FlightModel");
const User = require("../Models/UserModel");

const getFlights = async (req, res) => {
  try {
    const data = await Flights.find({});
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

const createFlight = async (req, res) => {
  try {
    console.log(req.body);
    const Eseats = req.body.EconomySeats;
    const Bseats = req.body.BusinessSeats;
    const Fseats = req.body.FirstClassSeats;
    if ((Eseats < 0) | (Bseats < 0) | (Fseats < 0)) {
      return res.json({
        statusCode: 1,
        error: "Cannot enter a negative number of seats",
      });
    }
    var Economylist = [];
    var Businesslist = [];
    var Firstlist = [];
    var i = 1;
    for (i; i <= Eseats; i++) {
      Economylist.push({
        Number: "E" + i,
        isReserved: false,
      });
    }
    var i = 1;
    for (i; i <= Bseats; i++) {
      Businesslist.push({
        Number: "B" + i,
        isReserved: false,
      });
    }
    var i = 1;
    for (i; i <= Fseats; i++) {
      Firstlist.push({
        Number: "F" + i,
        isReserved: false,
      });
    }
    await Flights.create({
      FlightNumber: req.body.FlightNumber,
      DepartureDate: req.body.DepartureDate,
      ArrivalDate: req.body.ArrivalDate,
      DepartureTime: req.body.DepartureTime,
      ArrivalTime: req.body.ArrivalTime,
      EconomySeats: req.body.EconomySeats,
      BusinessSeats: req.body.BusinessSeats,
      FirstClassSeats: req.body.FirstClassSeats,
      ArrivalAirport: req.body.ArrivalAirport,
      DepartureAirport: req.body.DepartureAirport,
      isDeparture: req.body.isDeparture,
      Price: req.body.Price,
      TripDuration: req.body.TripDuration,
      EconomySeatsList: Economylist,
      BusinessSeatsList: Businesslist,
      FirstSeatsList: Firstlist,
    });
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
    const data = await Flights.find(req.body);
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

const updateFlight = async (req, res) => {
  const FlightNumber = req.body.FlightNumber;
  const DepartureDate = req.body.DepartureDate;
  const ArrivalDate = req.body.ArrivalDate;
  const EconomySeats = req.body.EconomySeats;
  const BusinessSeats = req.body.BusinessSeats;
  const ArivalAirport = req.body.ArrivalAirport;
  const DepAirport = req.body.DepartureAirport;
  const ArrivalTime = req.body.ArrivalTime;
  const DepartureTime = req.body.DepartureTime;
  Flights.updateOne(
    { FlightNumber: req.body.FlightNumber },
    {
      $set: {
        FlightNumber,
        DepartureDate,
        ArrivalDate,
        DepartureTime,
        ArrivalTime,
        EconomySeats,
        BusinessSeats,
        ArivalAirport,
        DepAirport,
      },
    }
  )
    .then(() => res.json("Flight updated"))
    .catch((err) => res.status(400).json("Error:" + err));
};

const deleteFlight = async (req, res) => {
  try {
    const flightToBeDeleted = await Flights.findOne({
      FlightNumber: req.body.FlightNumber,
    });
    console.log(flightToBeDeleted);
    flightToBeDeleted.delete();
    return res.json({
      statusCode: 0,
      message: "Success",
    });
  } catch (exception) {
    return res.json({
      statusCode: 1,
      error: "Exception",
    });
  }
};

const showAvailableFlight = async (req, res) => {
  try {
    const data = await FlightModel.find();
    return res.json({
      statusCode: 0,
      message: "Success",
    });
  } catch (exception) {
    return res.json({
      statusCode: 1,
      error: "Exception",
    });
  }
};

module.exports = {
  createFlight,
  updateFlight,
  getFlights,
  deleteFlight,
  searchFlight,
  showAvailableFlight,
};
