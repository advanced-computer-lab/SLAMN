const mongoose = require("mongoose");
const { StringDecoder } = require("string_decoder");
const Schema = mongoose.Schema;
const Flight = require("./FlightModel");

const summary = new Schema({
  // DepartureFlight: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Flight",
  // },
  // ArrivalFlight: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Flight",
  // },
  DepartureFlightNumber:{
    type:String,
    required:true,
  },
  ArrivalFlightNumber:{
    type:String,
    required:true,
  },
  DepartureDepartureDate: {
    type: String,
    required: true,
  },
  DepartureArrivalDate: {
    type: String,
    required: true,
  },
  ArrivalDepartureDate: {
    type: String,
    required: true,
  },
  ArrivalArrivalDate: {
    type: String,
    required: true,
  },
  DepartureDepartureTime: {
    type: String,
    required: true,
  },
  DepartureArrivalTime: {
    type: String,
    required: true,
  },
  ArrivalDepartureTime: {
    type: String,
    required: true,
  },
  ArrivalArrivalTime: {
    type: String,
    required: true,
  },
  DeparturePrice: {
    type: Number,
    require: true,
  },
  ArrivalPrice: {
    type: Number,
    require: true,
  },
  CabinClass:{
    type:String,
    require:true,
  },
  SeatNumber:{
    type:String,
    require:true,
  },
  Price:{
    type:Number,
    require:true,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

summary.set("toJSON", { virtuals: true });
summary.set("toObject", { virtuals: true });
module.exports = mongoose.model("summary", summary);
