const { time } = require("console");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema({

  flightNumber: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: String,
    required: true,
  },
  EconomySeatsNumber: {
    type: Number,
    required: true,
  },
  BusinessClassSeatsNumber: {
    type: Number,
    required: true,
  },
  AirPort: {
    type: String,
    required: true,
  }
 }, { timestamps: true });
mongoose.models = {};
const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
