const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  PassportNumber: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Admin: {
    type: Boolean,
    required: true,
  },
  // Flights: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Flight",
  // },
});

mongoose.models = {};
const User = mongoose.model("User", userSchema);
module.exports = User;
