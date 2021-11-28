const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservation = new Schema({
  // DepartureFlight: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Flight",
  // },
  // ArrivalFlight: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Flight",
  // },
  
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  DepartureFlightNumber:{
    type:String,
    required:true,
  },
  ArrivalFlightNumber:{
    type:String,
    required:true,
  },
  CabinClass:{
    type:String,
    require:true,
  },
  NumberOfChildren:{
    type:Number,
    require:true,
  },
  NumberOfAdults:{
    type:Number,
    require:true,
  },
  totalPrice:{
    type:Number,
    require:true,
  }
});
reservation.set("toJSON", { virtuals: true });
reservation.set("toObject", { virtuals: true });
module.exports = mongoose.model("Reservations", reservation);
