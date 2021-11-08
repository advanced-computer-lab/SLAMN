const { time } = require("console");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  FlightNumber: {
    type: Number,
    required: true,
  },
  DepartureDate: {
    type: Date,
    required: true,
  },
  ArrivalDate: {
    type: Date,
    required: true,
  },
  DepartureTime: {
    type: time,
    required: true,
  },
  ArrivalTime: {
    type: time,
    required: true,
  },
  EconomySeats: {
    type: Number,
    required: true,
  },
  BusinessSeats: {
    type: Number,
    required: true,
  },
  ArrivalAirport: {
    type: String,
    required: true,
  },
  DepAirport: {
    type: String,
    required: true,
  },
});

mongoose.models = {};
const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
