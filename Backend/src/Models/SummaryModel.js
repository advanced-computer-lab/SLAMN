const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const flightSchema = require("./FlightModel");

const summary = new Schema({
  DepartureFlight: { flightSchema },
  ArrivalFlight: { flightSchema },
  Price: {
    type: int,
    require: true,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("summary", summary);
