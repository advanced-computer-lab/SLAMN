const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservation = new Schema({
  Flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  DepartureFlightNumber: {
    type: String,
    required: true,
  },
  ArrivalFlightNumber: {
    type: String,
    required: true,
  },
  DepCabinClass: {
    type: String,
    require: true,
  },
  ArrCabinClass: {
    type: String,
    require: true,
  },
  NumberOfPassengers: {
    type: Number,
    require: true,
  },

  totalPrice: {
    type: Number,
    require: true,
  }, //dep arr
});
reservation.set("toJSON", { virtuals: true });
reservation.set("toObject", { virtuals: true });
module.exports = mongoose.model("Reservations", reservation);
