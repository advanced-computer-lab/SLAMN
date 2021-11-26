const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Flight = require("./FlightModel");

const summary = new Schema({
  DepartureFlight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
  },
  ArrivalFlight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
  },
  Price: {
    type: Number,
    require: true,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

summary.set("toJSON", { virtuals: true });
summary.set("toObject", { virtuals: true });
module.exports = mongoose.model("summary", summary);
