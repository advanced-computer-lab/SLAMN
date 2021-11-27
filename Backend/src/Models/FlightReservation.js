const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservation = new Schema({
  DepartureFlight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
  },
  ArrivalFlight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
reservation.set("toJSON", { virtuals: true });
reservation.set("toObject", { virtuals: true });
module.exports = mongoose.model("Reservations", reservation);
