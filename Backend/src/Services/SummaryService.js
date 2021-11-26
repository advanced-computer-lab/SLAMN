const Flights = require("../Models/FlightModel");
const User = require("../Models/UserModel");
const Summary=require("../Models/SummaryModel");

const getSummary = async (req, res) => {
    const arrivalFlight=req.body.ArrivalFlight;
    const depFlight=req.body.DepartureFlight;
  try {
    const data = await Summary.find({ArrivalFlight:arrivalFlight,DepartureFlight:depFlight});
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
const createSummary= async (req, res) => {
    try {
      console.log(req.body);
      await Summary.create(req.body);
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
  
module.exports={
    getSummary,createSummary
};