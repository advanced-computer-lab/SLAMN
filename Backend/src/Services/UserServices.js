const User = require("../Models/UserModel");
const Flights = require("../Models/FlightModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config;

const signIn = async (req, res) => {
  const email = req.body.Email;
  const password = req.body.Password;

  try {
    const data = await User.findOne({ Email: email });
    if (data) {
      const validPassword = await bcrypt.compare(password, data.Password);
      if (validPassword) {
        const token = await jwt.sign(
          {
            id: data._id,
            email: data.email,
            password: data.Password,
          },
          process.env.SECRET,
          {
            expiresIn: "5h",
          }
        );
        res.set("auth", token);
        return res.json({
          statusCode: 0,
          message: "Success",
          data: data.Admin,
          token,
        });
      } else {
        return res.json({
          statusCode: 1,
          error: "Invalid Password",
        });
      }
    } else {
      return res.json({
        statusCode: 1,
        error: "Invalid Email",
      });
    }
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};

const signUp = async (req, res) => {
  try {
    const user = req.body;
    const data = await User.findOne({ Email: user.Email });
    if (data) {
      return res.json({
        statusCode: 1,
        error: "Invalid Email,this email already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.Password, salt);
      console.log(user);
      const reservations = [];
      const summaries = [];
      await User.create({
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Phone: user.Phone,
        Password: user.Password,
        PassportNumber: user.PassportNumber,
        Admin: false,
        UserReservations: reservations,
        Summaries: summaries,
      });
      return res.json({
        statusCode: 0,
        message: "Your account successfully created",
      });
    }
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "Server Error",
    });
  }
};

const viewAvailableSeats = async (req, res) => {
  try {
    const cabin = req.body.Cabin;
    const flight = req.body.FlightNumber;
    const seats = await Flights.findOne({ FlightNumber: flight });
    if (cabin == "Economy") {
      return res.json({
        statusCode: 0,
        message: "Flightfound",
        data: seats.EconomySeatsList,
      });
    } else {
      if (cabin == "Business") {
        return res.json({
          statusCode: 0,
          message: "Flightfound",
          data: seats.BusinessSeatsList,
        });
      } else {
        if (cabin == "FirstClass") {
          return res.json({
            statusCode: 0,
            message: "Flightfound",
            data: seats.FirstSeatsList,
          });
        }
      }
    }
  } catch (exception) {
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};

const selectSeats = async (req, res) => {
  try {
    const selectedSeat = req.body.seat,
    const cabin = req.body.Cabin;
    const flightnum = req.body.FlightNumber;
    const flight = await Flights.findOne({ FlightNumber: flightnum });
    if (cabin == "Economy") {
      var i = 1;
      const Eseats = flight.EconomySeatsList;
      for (i; i < Eseats.length; i++) {
        if (selectedSeat == Eseats[i].Number) {
          if (Eseats[i].isReserved == false) {
            Eseats[i].isReserved = true;
            return res.json({
              statusCode: 0,
              message: "Seat Reserved Successfully",
            });
          } else {
            return res.json({
              statusCode: 1,
              error: "This Seat is reserved please choose another seat",
            });
          }
        }
      }
    } else {
      if (cabin == "Business") {
        var i = 1;
        const Bseats = flight.BusinessSeatsList;
        for (i; i < Bseats.length; i++) {
          if (selectedSeat == Bseats[i].Number) {
            if (Bseats[i].isReserved == false) {
              Bseats[i].isReserved = true;
              return res.json({
                statusCode: 0,
                message: "Seat Reserved Successfully",
              });
            } else {
              return res.json({
                statusCode: 1,
                error: "This Seat is reserved please choose another seat",
              });
            }
          }
        }
      } else {
        if (cabin == "FirstClass") {
          var i = 1;
          const Fseats = flight.FirstSeatsList;
          for (i; i < Fseats.length; i++) {
            if (selectedSeat == Fseats[i].Number) {
              if (Fseats[i].isReserved == false) {
                Fseats[i].isReserved = true;
                return res.json({
                  statusCode: 0,
                  message: "Seat Reserved Successfully",
                });
              } else {
                return res.json({
                  statusCode: 1,
                  Error: "This Seat is reserved please choose another seat",
                });
              }
            }
          }
        }
      }
    }
  } catch (exception) {
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};
const deselectSeats = async (req, res) => {
  try {
    const selectedSeat = req.body.seat,
    const cabin = req.body.Cabin;
    const flightnum = req.body.FlightNumber;
    const flight = await Flights.findOne({ FlightNumber: flightnum });
    if (cabin == "Economy") {
      var i = 1;
      const Eseats = flight.EconomySeatsList;
      for (i; i < Eseats.length; i++) {
        if (selectedSeat == Eseats[i].Number) {
          if (Eseats[i].isReserved == true) {
            Eseats[i].isReserved = false;
            return res.json({
              statusCode: 0,
              message: "Seat deselected Successfully",
            });
          } else {
            return res.json({
              statusCode: 1,
              error: "This Seat is not already selected",
            });
          }
        }
      }
    } else {
      if (cabin == "Business") {
        var i = 1;
        const Bseats = flight.BusinessSeatsList;
        for (i; i < Bseats.length; i++) {
          if (selectedSeat == Bseats[i].Number) {
            if (Bseats[i].isReserved == true) {
              Bseats[i].isReserved = false;
              return res.json({
                statusCode: 0,
                message: "Seat deselected Successfully",
              });
            } else {
              return res.json({
                statusCode: 1,
                error: "This Seat is not already selected",
              });
            }
          }
        }
      } else {
        if (cabin == "FirstClass") {
          var i = 1;
          const Fseats = flight.FirstSeatsList;
          for (i; i < Fseats.length; i++) {
            if (selectedSeat == Fseats[i].Number) {
              if (Fseats[i].isReserved == true) {
                Fseats[i].isReserved = false;
                return res.json({
                  statusCode: 0,
                  message: "Seat deselected Successfully",
                });
              } else {
                return res.json({
                  statusCode: 1,
                  Error: "This Seat is not already selected",
                });
              }
            }
          }
        }
      }
    }
  } catch (exception) {
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};

module.exports = {
  signIn,
  viewAvailableSeats,
  selectSeats,
  deselectSeats,
  signUp,
};
