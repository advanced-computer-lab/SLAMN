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
});
reservation.set("toJSON", { virtuals: true });
reservation.set("toObject", { virtuals: true });
module.exports = mongoose.model("Reservations", reservation);
