const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservation = new Schema({
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
  NumberOfChildren: {
    type: Number,
    require: true,
  },
  NumberOfAdults: {
    type: Number,
    require: true,
  },
  returnSeats: {
    type: [
      {
        passengerNumber: {
          type: Number,
        },
        passengerType: {
          type: String,
        },
        passengerSeat: {
          type: String,
        },
      },
    ],
    require: true,
  },
  departureSeats: {
    type: [
      {
        passengerNumber: {
          type: Number,
        },
        passengerType: {
          type: String,
        },
        passengerSeat: {
          type: String,
        },
      },
    ],
    require: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
});
reservation.set("toJSON", { virtuals: true });
reservation.set("toObject", { virtuals: true });
module.exports = mongoose.model("Reservations", reservation);
