const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservation = require("./FlightReservation");
const summary = require("./SummaryModel");

const userSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  PassportNumber: {
    type: String,
    required: true,
  },
  CountryCode: {
    type: String,
    required: true,
  },
  HomeAddress: {
    type: String,
    required: true,
  },
  Admin: {
    type: Boolean,
    required: true,
  },
  UserReservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservations",
    },
  ],
  Summaries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "summary",
    },
  ],
});

mongoose.models = {};
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });
const User = mongoose.model("User", userSchema);
module.exports = User;
