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

const updateFlight = async (req, res) =>{
  const Original = Flights.findOne({FlightNumber: req.body.FlightNumber }, function (err, docs) {
     if (err){
         console.log(err)
     }
 });
 const ReqFlight = {
 
   FlightNumber: req.body.FlightNumber,
   DepartureDate:null,
   ArrivalDate:null,
   DepartureTime:null,
   ArrivalTime:null,
   EconomySeats:null,
   BusinessSeats:null,
   ArivalAirport:null,
   DepAirport:null
 };
   if(req.body.DepartureDate==null)
      ReqFlight.DepartureDate=Original.DepartureDate;
   else
      ReqFlight.DepartureDate=req.body.DepartureDate;
  if(req.body.ArrivalDate==null)
      ReqFlight.ArrivalDate=Original.ArrivalDate;
   else
      ReqFlight.ArrivalDate=req.body.ArrivalDate;
      if(req.body.DepartureTime==null)
      ReqFlight.DepartureTime=Original.DepartureTime;
   else
      ReqFlight.DepartureTime=req.body.DepartureTime;
      if(req.body.ArrivalTime==null)
      ReqFlight.ArrivalTime=Original.ArrivalTime;
   else
      ReqFlight.ArrivalTime=req.body.ArrivalTime;
      if(req.body.EconomySeats==null)
      ReqFlight.EconomySeats=Original.EconomySeats;
   else
      ReqFlight.EconomySeats=req.body.EconomySeats;
      if(req.body.BusinessSeats==null)
      ReqFlight.BusinessSeats=Original.BusinessSeats;
   else
      ReqFlight.BusinessSeats=req.body.BusinessSeats;
      if(req.body.ArivalAirport==null)
      ReqFlight.ArivalAirport=Original.ArivalAirport;
   else
      ReqFlight.ArivalAirport=req.body.ArivalAirport;
      if(req.body.DepAirport==null)
      ReqFlight.DepAirport=Original.DepAirport;
   else
      ReqFlight.DepAirport=req.body.DepAirport;
 
  
 
   const UpdatedFlight = Flights.findOneAndUpdate({FlightNumber: req.body.FlightNumber }, 
     ReqFlight, null)
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
