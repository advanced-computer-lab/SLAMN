const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  isReserved: {
    type: Boolean,
    required: true,
  },
});
const Seat = mongoose.model("Seat", seatSchema);
module.exports = Seat;
