const { time } = require("console");
const mongoose = require("mongoose");
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
      number: {
        type: String,
        required: true,
      },
      isReserved: {
        type: Boolean,
        required: true,
      },
    },
  ],
  BusinessSeatsList: [
    {
      number: {
        type: String,
        required: true,
      },
      isReserved: {
        type: Boolean,
        required: true,
      },
    },
  ],
  FirstSeatsList: [
    {
      number: {
        type: String,
        required: true,
      },
      isReserved: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

mongoose.models = {};
flightSchema.set("toJSON", { virtuals: true });
flightSchema.set("toObject", { virtuals: true });
const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
