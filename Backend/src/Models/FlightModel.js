const { time } = require("console");
const mongoose = require("mongoose");
const internal = require("stream");
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  FlightNumber: {
    type: Number,
    required: true,
  },
  DepartureDate: {
    type: String,
    required: true,
  },
  ArrivalDate: {
    type: String,
    required: true,
  },
  DepartureTime: {
    type: String,
    required: true,
  },
  ArrivalTime: {
    type: String,
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
  FirstClassSeats: {
    type: Number,
    required: true,
  },
  ArrivalAirport: {
    type: String,
    required: true,
  },
  DepartureAirport: {
    type: String,
    required: true,
  },
  isDeparture: {
    type: Boolean,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  TripDuration: {
    type: String,
    required: true,
  },
  EconomySeatsList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
    },
  ],
  BusinessSeatsList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
    },
  ],
  FirstSeatsList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
    },
  ],
});

mongoose.models = {};
const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
