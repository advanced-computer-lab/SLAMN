const User = require("../Models/UserModel");
const Summary = require("../Models/SummaryModel");
const Reservation = require("../Models/FlightReservation");
const nodemailer = require("nodemailer");
const Flights = require("../Models/FlightModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const stripe = require("stripe")(
  "sk_test_51KABAKIYMIwfTLe9BFM91jy4i0sgiQ5xm9n4frOuv664tpq32oS4SNvusi19OC9vkSrHClC9TyYNZ70qtiPnEzng00pBgVQdrL"
);
require("dotenv").config;

const Pay = async (req, res) => {
  let error;
  let status;
  try {
    const { product, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "aed",
        customer: customer.id,
        receipt_email: token.email,
        description: product.name,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address.zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (exception) {
    status = "failure";
    return res.json({
      statusCode: 1,
      error: "failed",
    });
  }
};

const signIn = async (req, res) => {
  const email = req.body.Email;
  const password = req.body.Password;

  try {
    const data = await User.findOne({ Email: email });
    if (data) {
      const validPassword = await bcrypt.compare(password, data.Password);
      console.log(validPassword,"trueeeeee");
      console.log(password,"trueeeeee");
      console.log(data.Password,"trueeeeee");
      if (validPassword) {
        const token = await jwt.sign(
          {
            id: data._id,
            email: data.Email,
            password: data.Password,
          },
          process.env.SECRET,
          {
            expiresIn: "5h",
          }
        );
        res.set("auth", token);
        console.log(token, "tokennnnn");
        return res.json({
          statusCode: 0,
          message: "Success",
          data: data.Admin,
          token,
        });
      } else {
        return res.json({
          statusCode: 1,
          message: "Invalid Password",
        });
      }
    } else {
      return res.json({
        statusCode: 1,
        message: "Invalid Email",
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
    const email = req.body.Email;
    user = req.body;

    const data = await User.findOne({ Email: email });
    if (data) {
      console.log("in if");
      return res.json({
        statusCode: 1,
        message: "Invalid Email,this email already exists",
      });
    } else {
      console.log("in else");
      const salt = await bcrypt.genSalt(10);
      user.Password = await bcrypt.hash(user.Password, salt);
      console.log(user);
      const reservations = [];
      const summaries = [];
      await User.create({
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Phone: user.Phone,
        Password: user.Password,
        HomeAddress: user.HomeAddress,
        CountryCode: user.CountryCode,
        PassportNumber: user.PassportNumber,
        Admin: false,
        UserReservations: reservations,
        Summaries: summaries,
      });
      return res.json(
         "Your account successfully created"
      );
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
    const flightnumber = req.body.FlightNumber;
    const flight = await Flights.findOne({ FlightNumber: flightnumber });
    console.log(flight, "theFlight");
    if (!flight) {
      return res.json({
        statusCode: 1,
        error: "Invalid FlightNumber",
      });
    } else {
      if (cabin === "Economy") {
        return res.json({
          statusCode: 0,
          message: "flight found",
          seats: flight.EconomySeatsList,
        });
      }
      if (cabin === "Business") {
        return res.json({
          statusCode: 0,
          message: "flight found",
          seats: flight.BusinessSeatsList,
        });
      }
      if (cabin === "First") {
        return res.json({
          statusCode: 0,
          message: "flight found",
          seats: flight.FirstSeatsList,
        });
      } else {
        return res.json({
          statusCode: 1,
          error: "Invalid Cabin Class",
        });
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
    const selectedSeat = req.body.seat;
    const cabin = req.body.Cabin;
    const flightnum = req.body.FlightNumber;
    const flight = await Flights.findOne({ FlightNumber: flightnum });
    if (cabin === "Economy") {
      var i = 0;
      var Eseats = flight.EconomySeatsList;
      for (i; i < Eseats.length; i++) {
        if (selectedSeat === Eseats[i].Number) {
          if (Eseats[i].isReserved === false) {
            Eseats[i].isReserved = true;
            break;
          } else {
            return res.json({
              statusCode: 1,
              error: "This Seat is reserved please choose another seat",
            });
          }
        }
      }
    } else {
      if (cabin === "Business") {
        var i = 0;
        var Bseats = flight.BusinessSeatsList;
        for (i; i < Bseats.length; i++) {
          if (selectedSeat === Bseats[i].number) {
            if (Bseats[i].isReserved === false) {
              Bseats[i].isReserved = true;
              break;
            } else {
              return res.json({
                statusCode: 1,
                error: "This Seat is reserved please choose another seat",
              });
            }
          }
        }
      } else {
        if (cabin === "FirstClass") {
          var i = 0;
          var Fseats = flight.FirstSeatsList;
          for (i; i < Fseats.length; i++) {
            if (selectedSeat === Fseats[i].number) {
              if (Fseats[i].isReserved === false) {
                Fseats[i].isReserved = true;
                break;
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
    Flights.updateOne(
      { FlightNumber: req.body.FlightNumber },
      {
        $set: {
          FlightNumber: flight.FlightNumber,
          DepartureDate: flight.DepartureDate,
          ArrivalDate: flight.ArrivalDate,
          DepartureTime: flight.DepartureTime,
          ArrivalTime: flight.ArrivalTime,
          EconomySeats: flight.EconomySeats,
          BusinessSeats: flight.BusinessSeats,
          FirstClassSeats: flight.FirstClassSeats,
          ArrivalAirport: flight.ArrivalAirport,
          DepartureAirport: flight.DepartureAirport,
          isDeparture: flight.isDeparture,
          Price: flight.Price,
          TripDuration: flight.TripDuration,
          EconomySeatsList: Eseats,
          BusinessSeatsList: Bseats,
          FirstSeatsList: Fseats,
        },
      }
    )
      .then(() =>
        res.json({
          statusCode: 0,
          message: "Seat Reserved Successfully and FlightUpdated",
        })
      )
      .catch((err) => res.status(400).json("Error:" + err));
  } catch (exception) {}
};

const deselectSeats = async (req, res) => {
  try {
    const selectedSeat = req.body.seat;
    const cabin = req.body.Cabin;
    const flightnum = req.body.FlightNumber;
    const flight = await Flights.findOne({ FlightNumber: flightnum });
    if (cabin === "Economy") {
      var i = 0;
      var Eseats = flight.EconomySeatsList;
      for (i; i < Eseats.length; i++) {
        if (selectedSeat === Eseats[i].Number) {
          if (Eseats[i].isReserved === true) {
            Eseats[i].isReserved = false;
            break;
          } else {
            return res.json({
              statusCode: 1,
              error: "This Seat is reserved please choose another seat",
            });
          }
        }
      }
    } else {
      if (cabin === "Business") {
        var i = 0;
        var Bseats = flight.BusinessSeatsList;
        for (i; i < Bseats.length; i++) {
          if (selectedSeat === Bseats[i].number) {
            if (Bseats[i].isReserved === true) {
              Bseats[i].isReserved = false;
              break;
            } else {
              return res.json({
                statusCode: 1,
                error: "This Seat is reserved please choose another seat",
              });
            }
          }
        }
      } else {
        if (cabin === "FirstClass") {
          var i = 0;
          var Fseats = flight.FirstSeatsList;
          for (i; i < Fseats.length; i++) {
            if (selectedSeat === Fseats[i].number) {
              if (Fseats[i].isReserved === true) {
                Fseats[i].isReserved = false;
                break;
              } else {
                return res.json({
                  statusCode: 1,
                  Error: "This Seat is not reserved",
                });
              }
            }
          }
        }
      }
    }
    Flights.updateOne(
      { FlightNumber: req.body.FlightNumber },
      {
        $set: {
          FlightNumber: flight.FlightNumber,
          DepartureDate: flight.DepartureDate,
          ArrivalDate: flight.ArrivalDate,
          DepartureTime: flight.DepartureTime,
          ArrivalTime: flight.ArrivalTime,
          EconomySeats: flight.EconomySeats,
          BusinessSeats: flight.BusinessSeats,
          FirstClassSeats: flight.FirstClassSeats,
          ArrivalAirport: flight.ArrivalAirport,
          DepartureAirport: flight.DepartureAirport,
          isDeparture: flight.isDeparture,
          Price: flight.Price,
          TripDuration: flight.TripDuration,
          EconomySeatsList: Eseats,
          BusinessSeatsList: Bseats,
          FirstSeatsList: Fseats,
        },
      }
    )
      .then(() =>
        res.json({
          statusCode: 0,
          message: "Seat Deselected Successfully and FlightUpdated",
        })
      )
      .catch((err) => res.status(400).json("Error:" + err));
  } catch (exception) {}
};

const changeSeats = async (req, res) => {
  try {
    const oldSeats = req.body.oldSeats;
    const newSeats = req.body.newSeats;
    const cabin = req.body.oldCabin;
    const newCabin = req.body.newCabin;
    const flightNumber = req.body.FlightNumber;
    var unreserve = [];
    const flight = await Flights.find({ FlightNumber: flightNumber });
    var a = [];
    var Economy = flight[0].EconomySeatsList;
    var Business = flight[0].BusinessSeatsList;
    var First = flight[0].FirstSeatsList;
    if (cabin === "Economy") {
      a = Economy;
      var i = 0;
      for (i; i < a.length; i++) {
        var j = 0;
        for (j; j < oldSeats.length; j++) {
          if (a[i].number === oldSeats[j].passengerSeat) {
            unreserve.push({
              number: a[i].number,
              isReserved: false,
            });
            break;
          }
        }
        if (j >= oldSeats.length) {
          unreserve.push(a[i]);
        }
      }
      Economy = unreserve;
      if (newCabin === "Economy") {
        var i = 0;
        finalSeats = [];
        for (i; i < Economy.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Economy[i].number === newSeats[j].passengerSeat) {
              if (Economy[i].isReserved === false) {
                finalSeats.push({
                  number: Economy[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Economy[i]);
          }
        }
        Economy = finalSeats;
      }

      if (newCabin === "Business") {
        var i = 0;
        finalSeats = [];
        for (i; i < Business.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Business[i].number === newSeats[j].passengerSeat) {
              if (Business[i].isReserved === false) {
                finalSeats.push({
                  number: Business[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Business[i]);
          }
        }
        Business = finalSeats;
      }

      if (newCabin === "First") {
        var i = 0;
        finalSeats = [];
        for (i; i < First.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (First[i].number === newSeats[j].passengerSeat) {
              if (First[i].isReserved === false) {
                finalSeats.push({
                  number: First[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(First[i]);
          }
        }
        First = finalSeats;
      }
    }

    if (cabin === "Business") {
      a = Business;
      var i = 0;
      for (i; i < a.length; i++) {
        var j = 0;
        for (j; j < oldSeats.length; j++) {
          if (a[i].number === oldSeats[j].passengerSeat) {
            unreserve.push({
              number: a[i].number,
              isReserved: false,
            });
            break;
          }
        }
        if (j >= oldSeats.length) {
          unreserve.push(a[i]);
        }
      }
      Business = unreserve;
      if (newCabin === "Economy") {
        var i = 0;
        finalSeats = [];
        for (i; i < Economy.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Economy[i].number === newSeats[j].passengerSeat) {
              if (Economy[i].isReserved === false) {
                finalSeats.push({
                  number: Economy[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Economy[i]);
          }
        }
        Economy = finalSeats;
      }

      if (newCabin === "Business") {
        var i = 0;
        finalSeats = [];
        for (i; i < Business.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Business[i].number === newSeats[j].passengerSeat) {
              if (Business[i].isReserved === false) {
                finalSeats.push({
                  number: Business[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Business[i]);
          }
        }
        Business = finalSeats;
      }

      if (newCabin === "First") {
        var i = 0;
        finalSeats = [];
        for (i; i < First.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (First[i].number === newSeats[j].passengerSeat) {
              if (First[i].isReserved === false) {
                finalSeats.push({
                  number: First[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(First[i]);
          }
        }
        First = finalSeats;
      }
    }

    if (cabin === "First") {
      a = First;
      var i = 0;
      for (i; i < a.length; i++) {
        var j = 0;
        for (j; j < oldSeats.length; j++) {
          if (a[i].number === oldSeats[j].passengerSeat) {
            unreserve.push({
              number: a[i].number,
              isReserved: false,
            });
            break;
          }
        }
        if (j >= oldSeats.length) {
          unreserve.push(a[i]);
        }
      }
      First = unreserve;
      if (newCabin === "Economy") {
        var i = 0;
        finalSeats = [];
        console.log(Economy, "ECONOMYY");
        for (i; i < Economy.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Economy[i].number === newSeats[j].passengerSeat) {
              if (Economy[i].isReserved === false) {
                finalSeats.push({
                  number: Economy[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Economy[i]);
          }
        }
        Economy = finalSeats;
        console.log(Economy, "ECONOMYY2");
      }

      if (newCabin === "Business") {
        var i = 0;
        finalSeats = [];
        for (i; i < Business.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Business[i].number === newSeats[j].passengerSeat) {
              if (Business[i].isReserved === false) {
                finalSeats.push({
                  number: Business[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Business[i]);
          }
        }
        Business = finalSeats;
      }

      if (newCabin === "First") {
        var i = 0;
        finalSeats = [];
        for (i; i < First.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (First[i].number === newSeats[j].passengerSeat) {
              if (First[i].isReserved === false) {
                finalSeats.push({
                  number: First[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(First[i]);
          }
        }
        First = finalSeats;
      }
    }

    Flights.updateOne(
      { FlightNumber: req.body.FlightNumber },
      {
        $set: {
          FlightNumber: flight.FlightNumber,
          DepartureDate: flight.DepartureDate,
          ArrivalDate: flight.ArrivalDate,
          DepartureTime: flight.DepartureTime,
          ArrivalTime: flight.ArrivalTime,
          EconomySeats: flight.EconomySeats,
          BusinessSeats: flight.BusinessSeats,
          FirstClassSeats: flight.FirstClassSeats,
          ArrivalAirport: flight.ArrivalAirport,
          DepartureAirport: flight.DepartureAirport,
          isDeparture: flight.isDeparture,
          Price: flight.Price,
          TripDuration: flight.TripDuration,
          EconomySeatsList: Economy,
          BusinessSeatsList: Business,
          FirstSeatsList: First,
          BaggageAllowance: flight.BaggageAllowance,
        },
      }
    ).catch((err) => res.status(400).json("Error:" + err));
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};

const updateDepartureFlightReservation = async (req, res) => {
  const reservation = await Reservation.findOne({
    _id: req.body.BookingNumber,
  });
  const CabinClass = req.body.CabinClass;
  const NumberOfChildren = req.body.NumberOfChildren;
  const NumberOfAdults = req.body.NumberOfAdults;
  const NumberOfPassengers =
    req.body.NumberOfChildren + req.body.NumberOfAdults;
  var basePrice =
    NumberOfAdults * req.body.Price + NumberOfChildren * req.body.Price * 0.5;
  // var emptySeats=0;
  // var enoughSeats=false;
  const PriceDifference = basePrice - reservation.totalPrice;
  const valueOfId = req.payload.id;
  const userData = await User.findOne({ _id: valueOfId });
  if (userData) {
    // if(NumberOfPassengers>reservation.NumberOfPassengers){
    //   //check if there is enough seats
    //   const newSeats=NumberOfPassengers-reservation.NumberOfPassengers;
    //   switch (CabinClass) {
    //     case "Economy": {
    //       for(i=0;i<EconomySeatsList.length;i++){
    //         if(EconomySeatsList[i].isReserved==false)
    //            emptySeats++;
    //         if(emptySeats==newSeats){
    //           enoughSeats=true;
    //           break;
    //         }
    //       }
    //       break;
    //     }
    //     case "First": {
    //       for(i=0;i<FirstSeatsList.length;i++){
    //         if(FirstSeatsList[i].isReserved==false)
    //            emptySeats++;
    //         if(emptySeats==newSeats){
    //           enoughSeats=true;
    //           break;
    //         }
    //       }
    //       break;
    //     }
    //     case "Business": {
    //       for(i=0;i<BusinessSeatsList.length;i++){
    //         if(BusinessSeatsList[i].isReserved==false)
    //            emptySeats++;
    //         if(emptySeats==newSeats){
    //           enoughSeats=true;
    //           break;
    //         }
    //       }
    //       break;
    //     }
    //     default: {
    //       return res.json({
    //         statusCode: 1,
    //         error: "Not a valid class",
    //       });
    //     }
    //   }
    // }
    // else{
    //   enoughSeats=true;
    //   if(NumberOfPassengers>reservation.NumberOfPassengers){
    //     //call update seats
    //   }
    // }
    // if(!enoughSeats){
    //   return res.json({
    //     statusCode: 1,
    //     error: "No available empty seats",
    //   });
    // }
    if (reservation.CabinClass != CabinClass) {
      switch (CabinClass) {
        case "Economy": {
          basePrice = basePrice;
          break;
        }
        case "First": {
          basePrice *= 2;
          break;
        }
        case "Business": {
          basePrice *= 1.5;
          break;
        }
        default: {
          return res.json({
            statusCode: 1,
            error: "Not a valid class",
          });
        }
      }

      // else{
      //   call update seat
      // }
    }
    const oldSeats = reservation.departureSeats;
    const newSeats = req.body.passengers;
    const cabin = reservation.DepCabinClass;
    const newCabin = req.body.CabinClass;
    const flightNumber = reservation.DepartureFlightNumber;
    var unreserve = [];
    const flight = await Flights.find({ FlightNumber: flightNumber });
    const a = [];
    var Economy = flight[0].EconomySeatsList;
    var Business = flight[0].BusinessSeatsList;
    var First = flight[0].FirstSeatsList;
    if (cabin === "Economy") {
      a = Economy;
      var i = 0;
      for (i; i < a.length; i++) {
        var j = 0;
        for (j; j < oldSeats.length; j++) {
          if (a[i].number === oldSeats[j].passengerSeat) {
            unreserve.push({
              number: a[i].number,
              isReserved: false,
            });
            break;
          }
        }
        if (j >= oldSeats.length) {
          unreserve.push(a[i]);
        }
      }
      Economy = unreserve;
      if (newCabin === "Economy") {
        var i = 0;
        finalSeats = [];
        for (i; i < Economy.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Economy[i].number === newSeats[j].passengerSeat) {
              if (Economy[i].isReserved === false) {
                finalSeats.push({
                  number: Economy[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Economy[i]);
          }
        }
        Economy = finalSeats;
      }

      if (newCabin === "Business") {
        var i = 0;
        finalSeats = [];
        for (i; i < Business.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Business[i].number === newSeats[j].passengerSeat) {
              if (Business[i].isReserved === false) {
                finalSeats.push({
                  number: Business[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Business[i]);
          }
        }
        Business = finalSeats;
      }

      if (newCabin === "First") {
        var i = 0;
        finalSeats = [];
        for (i; i < First.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (First[i].number === newSeats[j].passengerSeat) {
              if (First[i].isReserved === false) {
                finalSeats.push({
                  number: First[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(First[i]);
          }
        }
        First = finalSeats;
      }
    }

    if (cabin === "Business") {
      a = Business;
      var i = 0;
      for (i; i < a.length; i++) {
        var j = 0;
        for (j; j < oldSeats.length; j++) {
          if (a[i].number === oldSeats[j].passengerSeat) {
            unreserve.push({
              number: a[i].number,
              isReserved: false,
            });
            break;
          }
        }
        if (j >= oldSeats.length) {
          unreserve.push(a[i]);
        }
      }
      Business = unreserve;
      if (newCabin === "Economy") {
        var i = 0;
        finalSeats = [];
        for (i; i < Economy.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Economy[i].number === newSeats[j].passengerSeat) {
              if (Economy[i].isReserved === false) {
                finalSeats.push({
                  number: Economy[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Economy[i]);
          }
        }
        Economy = finalSeats;
      }

      if (newCabin === "Business") {
        var i = 0;
        finalSeats = [];
        for (i; i < Business.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Business[i].number === newSeats[j].passengerSeat) {
              if (Business[i].isReserved === false) {
                finalSeats.push({
                  number: Business[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Business[i]);
          }
        }
        Business = finalSeats;
      }

      if (newCabin === "First") {
        var i = 0;
        finalSeats = [];
        for (i; i < First.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (First[i].number === newSeats[j].passengerSeat) {
              if (First[i].isReserved === false) {
                finalSeats.push({
                  number: First[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(First[i]);
          }
        }
        First = finalSeats;
      }
    }

    if (cabin === "First") {
      a = First;
      var i = 0;
      for (i; i < a.length; i++) {
        var j = 0;
        for (j; j < oldSeats.length; j++) {
          if (a[i].number === oldSeats[j].passengerSeat) {
            unreserve.push({
              number: a[i].number,
              isReserved: false,
            });
            break;
          }
        }
        if (j >= oldSeats.length) {
          unreserve.push(a[i]);
        }
      }
      First = unreserve;
      if (newCabin === "Economy") {
        var i = 0;
        finalSeats = [];
        console.log(Economy, "ECONOMYY");
        for (i; i < Economy.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Economy[i].number === newSeats[j].passengerSeat) {
              if (Economy[i].isReserved === false) {
                finalSeats.push({
                  number: Economy[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Economy[i]);
          }
        }
        Economy = finalSeats;
        console.log(Economy, "ECONOMYY2");
      }

      if (newCabin === "Business") {
        var i = 0;
        finalSeats = [];
        for (i; i < Business.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (Business[i].number === newSeats[j].passengerSeat) {
              if (Business[i].isReserved === false) {
                finalSeats.push({
                  number: Business[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(Business[i]);
          }
        }
        Business = finalSeats;
      }

      if (newCabin === "First") {
        var i = 0;
        finalSeats = [];
        for (i; i < First.length; i++) {
          var j = 0;
          for (j; j < newSeats.length; j++) {
            if (First[i].number === newSeats[j].passengerSeat) {
              if (First[i].isReserved === false) {
                finalSeats.push({
                  number: First[i].number,
                  isReserved: true,
                });
                break;
              }
            }
          }
          if (j >= newSeats.length) {
            finalSeats.push(First[i]);
          }
        }
        First = finalSeats;
      }
    }

    Flights.updateOne(
      { FlightNumber: reservation.DepartureFlightNumber },
      {
        $set: {
          FlightNumber: flight.FlightNumber,
          DepartureDate: flight.DepartureDate,
          ArrivalDate: flight.ArrivalDate,
          DepartureTime: flight.DepartureTime,
          ArrivalTime: flight.ArrivalTime,
          EconomySeats: flight.EconomySeats,
          BusinessSeats: flight.BusinessSeats,
          FirstClassSeats: flight.FirstClassSeats,
          ArrivalAirport: flight.ArrivalAirport,
          DepartureAirport: flight.DepartureAirport,
          isDeparture: flight.isDeparture,
          Price: flight.Price,
          TripDuration: flight.TripDuration,
          EconomySeatsList: Economy,
          BusinessSeatsList: Business,
          FirstSeatsList: First,
          BaggageAllowance: flight.BaggageAllowance,
        },
      }
    ).catch((err) => res.status(400).json("Error:" + err));

    Reservation.findByIdAndUpdate(
      { _id: req.body.BookingNumber },
      {
        DepCabinClass: CabinClass,
        totalPrice: PriceDifference,
        NumberOfChildren: NumberOfChildren,
        NumberOfAdults: NumberOfAdults,
        departureSeats: req.body.passengers,
      },
      function (err, docs) {
        if (err) {
          return res.json({
            message: " error",
          });
        } else {
          console.log("Updated Reservation : ", docs);
          return res.json({
            message: "success",
          });
        }
      }
    );
  } else {
    return res.json({
      statusCode: 1,
      error: "sign in please",
    });
  }
};

const createFlightReservation = async (req, res) => {
  try {
    console.log(req.body);
    const valueOfId = req.payload.id;
    const userData = await User.findOne({ _id: valueOfId });
    const arrivalFlight = await Flights.findOne({
      FlightNumber: req.body.ArrivalFlightNumber,
    });
    const departureFlight = await Flights.findOne({
      FlightNumber: req.body.DepartureFlightNumber,
    });
    const DepCabinclass = req.body.DepCabinClass;
    const ArrCabinclass = req.body.ArrCabinClass;
    var basePrice = arrivalFlight.Price + departureFlight.Price;
    const noOfPassengers = req.body.NumberOfPassengers;

    switch (DepCabinclass) {
      case "Economy": {
        basePrice = basePrice;
        break;
      }
      case "First": {
        basePrice *= 2;
        break;
      }
      case "Business": {
        basePrice *= 1.5;
        break;
      }
      default: {
        return res.json({
          statusCode: 1,
          error: "Not a valid class",
        });
      }
    }

    if (userData) {
      const reserve = await Reservation.create({
        DepartureFlightNumber: departureFlight.FlightNumber,
        ArrivalFlightNumber: arrivalFlight.FlightNumber,
        DepCabinclass: DepCabinclass,
        ArrCabinclass: ArrCabinclass,
        NumberOfChildren:NumberOfChildren,
        NumberOfAdults:NumberOfAdults,
        departureSeats:req.body.depSeats,
        returnSeats:req.body.arrSeats,
        totalPrice: basePrice,
        User: {
          _id: userData._id,
          FirstName: userData.FirstName,
          LastName: userData.LastName,
          Email: userData.Email,
          Phone: userData.Phone,
          PassportNumber: userData.PassportNumber,
          Password: userData.Password,
          Admin: userData.Admin,
          UserReservations: userData.UserReservations,
          Summaries: userData.Summaries,
        },
      });
      const ReserveTobePushed = {
        _id: reserve._id,
        User: reserve.User,
        DepartureFlightNumber: reserve.DepartureFlightNumber,
        DepCabinclass: reserve.DepCabinclass,
        ArrCabinclass: reserve.ArrCabinclass,
        ArrivalFlightNumber: reserve.ArrivalFlightNumber,
        CabinClass: reserve.CabinClass,
        NumberOfPassengers: reserve.NumberOfPassengers,
        totalPrice: reserve.totalPrice,
      };
      userData.UserReservations.push(ReserveTobePushed);

      await User.findOneAndUpdate({ _id: userData._id }, userData, null).catch(
        (err) => res.status(400).json("Error:" + err)
      );
    } else {
      return res.json({
        statusCode: 1,
        error: "sign in please",
      });
    }
    return res.json({
      statusCode: 0,
      message: "Success",
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const user = req.payload.id;
    const userData = await User.findOne({ _id: user });
    const ReservationToBeDeleted = await Reservation.findOne({
      _id: req.body._id,
    });
    if (userData) {
      console.log(ReservationToBeDeleted);
      var i=0;
        for(i=0;i<userData.UserReservations.length;i++){
          if(userData.UserReservations[i].toString()===req.body.BookingNumber){
            var index = i;
            if (index > -1) {
              userData.UserReservations.splice(index, 1);
            }
          }
        }
      await User.findOneAndUpdate({ _id: userData._id }, userData, null).catch(
        (err) => res.status(400).json("Error:" + err)
      );
      ReservationToBeDeleted.delete();
      return res.json({
        statusCode: 0,
        message: "Success",
        data: userData.UserReservations,
      });
    } else {
      return res.json({
        statusCode: 1,
        error: "Can't delete this reservation",
      });
    }
  } catch (exception) {
    return res.json({
      statusCode: 1,
      error: "Exception",
    });
  }
};

const sendEmail = (req, res) => {
  let userEmail = req.body.email;
  let emailSubject = req.body.emailSubject;
  let emailBody = req.body.emailBody;
  let transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "slamndamn@outlook.com",
      pass: "slamn123",
    },
  });

  const message = req.body.message;

  let mailOptions = {
    from: "salmndamn@outlook.com",
    to: userEmail,
    subject: emailSubject,
    text: emailBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({ message: "error" });
    }

    console.log(info);
    return res.json({ info, message: "Success" });
  });
};

const getFutureReservations = async (req, res) => {
  try {
    const valueOfId = req.payload.id;
    const userData = await User.findOne({ _id: valueOfId });

    // const userData=await User.findOne({ _id: "61a7780f866bf0ec6787692a"});
    var current = new Date();

    if (userData) {
      let reservations = await Reservation.find({ User: userData });
      console.log(current, "MAYAA", reservations);
      let result = [];
      var reservationresult;
      //console.log(reservations);
      const arr = reservations.map((res) => res.DepartureFlightNumber);
      console.log(arr);
      for (var i = 0; i < arr.length; i++) {
        var flight = await Flights.findOne({ FlightNumber: arr[i] });
        console.log(flight.DepartureDate);
        console.log(new Date(2022 - 01 - 01) >= new Date(2021 - 12 - 23));
        if (new Date(flight.DepartureDate) > new Date(req.body.date)) {
          console.log("dakhal");
          reservationresult = await Reservation.find({
            User: userData,
            DepartureFlightNumber: flight.FlightNumber,
          });
          result.push(reservationresult);
          console.log("dakhal");
        }
      }

      console.log(result);

      return res.json({
        statusCode: 0,
        message: "Success",
        data: result,
      });
    } else {
      return res.json({
        statusCode: 1,
        error: "sign in please",
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

const createSummary = async (req, res) => {
  try {
    console.log(req.payload, "elpayloaaddd");
    const valueOfId = req.payload.id;

    const userData = await User.findOne({ _id: valueOfId });
    // const userData=await User.findOne({ _id: "61aca7254bbab011cefe35e2"});
    const arrivalFlight = await Flights.findOne({
      FlightNumber: req.body.ArrivalFlightNumber,
    });
    const departureFlight = await Flights.findOne({
      FlightNumber: req.body.DepartureFlightNumber,
    });
    const totalPrice = arrivalFlight.Price + departureFlight.Price;
    console.log(departureFlight);
    console.log(arrivalFlight);

    if (userData) {
      const sumUP = await Summary.create({
        DepartureFlightNumber: departureFlight.FlightNumber,
        ArrivalFlightNumber: arrivalFlight.FlightNumber,
        DepartureAirport: departureFlight.DepartureAirport,
        ArrivalAirport: departureFlight.ArrivalAirport,
        DepartureDepartureDate: departureFlight.DepartureDate,
        DepartureArrivalDate: departureFlight.ArrivalDate,
        ArrivalDepartureDate: arrivalFlight.DepartureDate,
        ArrivalArrivalDate: arrivalFlight.ArrivalDate,
        DepartureDepartureTime: departureFlight.DepartureTime,
        DepartureArrivalTime: departureFlight.ArrivalTime,
        ArrivalDepartureTime: arrivalFlight.DepartureTime,
        ArrivalArrivalTime: arrivalFlight.ArrivalTime,
        DepartuePrice: departureFlight.Price,
        ArrivalPrice: arrivalFlight.Price,
        returnCabin: req.body.returnCabin,
        returnSeats: req.body.returnSeats,
        departureCabin: req.body.departureCabin,
        departureSeats: req.body.departureSeats,
        User: {
          _id: userData._id,
          FirstName: userData.FirstName,
          LastName: userData.LastName,
          Email: userData.Email,
          Phone: userData.Phone,
          PassportNumber: userData.PassportNumber,
          Password: userData.Password,
          Admin: userData.Admin,
          UserReservations: userData.UserReservations,
          Summaries: userData.Summaries,
        },
        Price: totalPrice,
      });

      userData.Summaries.push(sumUP);
      await User.findOneAndUpdate({ _id: userData._id }, userData, null).catch(
        (err) => res.status(400).json("Error:" + err)
      );

      //console.log(sumUP) ;

      return res.json({
        statusCode: 0,
        message: "Success",
        data: sumUP,
      });
    } else {
      return res.json({
        statusCode: 1,
        error: "sign in please",
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

const getSummary = async (req, res) => {
  try {
    const arrivalFlight = await Flights.findOne({
      FlightNumber: req.body.ArrivalFlightNumber,
    });
    const departureFlight = await Flights.findOne({
      FlightNumber: req.body.DepartureFlightNumber,
    });
    const valueOfId = req.payload.id;

    const userData = await User.findOne({ _id: valueOfId }).populate(
      "Summaries"
    );
    const data = await Summary.findOne({
      User: userData,
      ArrivalFlightNumber: arrivalFlight.FlightNumber,
      DepartureFlight: departureFlight.FlightNumber,
    });
    console.log(data);
    if (userData) {
      return res.json({
        statusCode: 0,
        message: "Success",
        data: data,
      });
    } else {
      return res.json({
        statusCode: 1,
        error: "sign in please",
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

const updateAccount = async (req, res) => {
  console.log("innnnnn");
  const valueOfId = req.payload.id;
  console.log(valueOfId, "whatttt");

  User.findByIdAndUpdate(
    valueOfId,
    {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      PassportNumber: req.body.PassportNumber,
    },
    function (err, docs) {
      if (err) {
        console.log(err, "erroooooorrr");
        return res.json({
          message: " error",
        });
      } else {
        console.log("Updated User : ", docs);
        return res.json({
          message: "success",
        });
      }
    }
  );
};

const displayaccount = async (req, res) => {
  try {
    const valueOfId = req.payload.id;
    console.log(req.payload, "reqqqqqqqqqqqqqqqq");
    // const displayedNotes = await notes.find({ user: valueOfId });
    // const user = await User.findOne({ user: { $eq: valueOfId } });

    const user = await User.findOne({
      _id: valueOfId,
    });
    console.log(user, "USERSSSSSSSSSSSSSSSSSSSSSS");
    return res.json({
      user,
    });
  } catch (exception) {
    console.log(exception, "EXCEPTIOOOOOOOONNNNNN");
    return res.json({
      statusCode: 1,
      error: "Exception",
    });
  }
};

const changePassword = async (req, res) => {
  const valueOfId = req.payload.id;
  const password = req.body.Password;

  try {
    let user = await User.findOne({
      _id: valueOfId,
    });
    if (user) {
      var result = bcrypt.compareSync(password, user.Password);
      console.log(result);
      console.log(user);
      //
      if (result) {
        user.Password = bcrypt.hashSync(req.body.newPassword, 10);
        user.save();
        console.log(user);

        return res.json({ message: "success" });
      } else {
        return res.json({ message: "old password is wrong" });
      }
    }
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};
const updateSameDepartureFlightReservation = async (req, res) => {
  const reservation= await Reservation.findOne({_id:req.body.BookingNumber});
  const CabinClass=req.body.CabinClass;
  const NumberOfChildren=req.body.NumberOfChildren;
  const NumberOfAdults=req.body.NumberOfAdults;
  var basePrice=(NumberOfAdults*req.body.Price)+(NumberOfChildren*req.body.Price*0.5);
  const PriceDifference=basePrice-reservation.totalPrice;
  const valueOfId = req.payload.id;
  const userData = await User.findOne({ _id: valueOfId });
  if(userData){
      if(reservation.DepCabinClass!=CabinClass){
        switch (CabinClass) {
          case "Economy": {
            basePrice = basePrice;
            break;
          }
          case "First": {
            basePrice *= 2;
            break;
          }
          case "Business": {
            basePrice *= 1.5;
            break;
          }
          default: {
            return res.json({
              statusCode: 1,
              error: "Not a valid class",
            });
          }
        }
        }
        const oldSeats = reservation.departureSeats;
        const newSeats = req.body.passengers;
        const cabin = reservation.DepCabinClass;
        const newCabin = req.body.CabinClass;
        const flightNumber = reservation.DepartureFlightNumber;
        var unreserve = [];
        const flight = await Flights.find({ FlightNumber: flightNumber });
        var a = [];
        var Economy = flight[0].EconomySeatsList;
        var Business = flight[0].BusinessSeatsList;
        var First = flight[0].FirstSeatsList;
        if (cabin === "Economy") {
          a = Economy;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          Economy = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
    
        if (cabin === "Business") {
          a = Business;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          Business = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
    
        if (cabin === "First") {
          a = First;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          First = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            console.log(Economy, "ECONOMYY");
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
            console.log(Economy, "ECONOMYY2");
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
    
        Flights.updateOne(
          { FlightNumber: reservation.DepartureFlightNumber },
          {
            $set: {
              FlightNumber: flight.FlightNumber,
              DepartureDate: flight.DepartureDate,
              ArrivalDate: flight.ArrivalDate,
              DepartureTime: flight.DepartureTime,
              ArrivalTime: flight.ArrivalTime,
              EconomySeats: flight.EconomySeats,
              BusinessSeats: flight.BusinessSeats,
              FirstClassSeats: flight.FirstClassSeats,
              ArrivalAirport: flight.ArrivalAirport,
              DepartureAirport: flight.DepartureAirport,
              isDeparture: flight.isDeparture,
              Price: flight.Price,
              TripDuration: flight.TripDuration,
              EconomySeatsList: Economy,
              BusinessSeatsList: Business,
              FirstSeatsList: First,
              BaggageAllowance: flight.BaggageAllowance,
            },
          }
        ).catch((err) => res.status(400).json("Error:" + err));
        
  Reservation.findByIdAndUpdate({ _id:req.body.BookingNumber},
    {
        DepCabinClass:CabinClass,
        totalPrice:PriceDifference,
        NumberOfChildren:NumberOfChildren,
        NumberOfAdults:NumberOfAdults,
        departureSeats:req.body.passengers,
    },function (err, docs) {
      if (err) {
         return res.json({
          message: " error",
        });
      } else {
        console.log("Updated Reservation : ", docs);
        return res.json({
        message: "success",
        });
      }
    }
  );}
  else{
    return res.json({
      statusCode: 1,
      error: "sign in please",
    });
  }
};
const updateSameArrivalFlightReservation = async (req, res) => {
  const reservation= await Reservation.findOne({_id:req.body.BookingNumber});
  const CabinClass=req.body.CabinClass;
  const NumberOfChildren=req.body.NumberOfChildren;
  const NumberOfAdults=req.body.NumberOfAdults;
  var basePrice=(NumberOfAdults*req.body.Price)+(NumberOfChildren*req.body.Price*0.5);
  const PriceDifference=basePrice-reservation.totalPrice;
  const valueOfId = req.payload.id;
  const userData = await User.findOne({ _id: valueOfId });
  if(userData){
      if(reservation.ArrCabinClass!=CabinClass){
        switch (CabinClass) {
          case "Economy": {
            basePrice = basePrice;
            break;
          }
          case "First": {
            basePrice *= 2;
            break;
          }
          case "Business": {
            basePrice *= 1.5;
            break;
          }
          default: {
            return res.json({
              statusCode: 1,
              error: "Not a valid class",
            });
          }
        }
        }
        const oldSeats = reservation.returnSeats;
        const newSeats = req.body.passengers;
        const cabin = reservation.ArrCabinClass;
        const newCabin = req.body.CabinClass;
        const flightNumber = reservation.ArrivalFlightNumber;
        var unreserve = [];
        const flight = await Flights.find({ FlightNumber: flightNumber });
        var a = [];
        var Economy = flight[0].EconomySeatsList;
        var Business = flight[0].BusinessSeatsList;
        var First = flight[0].FirstSeatsList;
        if (cabin === "Economy") {
          a = Economy;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          Economy = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
    
        if (cabin === "Business") {
          a = Business;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          Business = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
    
        if (cabin === "First") {
          a = First;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          First = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            console.log(Economy, "ECONOMYY");
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
            console.log(Economy, "ECONOMYY2");
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
    
        Flights.updateOne(
          { FlightNumber: reservation.DepartureFlightNumber },
          {
            $set: {
              FlightNumber: flight.FlightNumber,
              DepartureDate: flight.DepartureDate,
              ArrivalDate: flight.ArrivalDate,
              DepartureTime: flight.DepartureTime,
              ArrivalTime: flight.ArrivalTime,
              EconomySeats: flight.EconomySeats,
              BusinessSeats: flight.BusinessSeats,
              FirstClassSeats: flight.FirstClassSeats,
              ArrivalAirport: flight.ArrivalAirport,
              DepartureAirport: flight.DepartureAirport,
              isDeparture: flight.isDeparture,
              Price: flight.Price,
              TripDuration: flight.TripDuration,
              EconomySeatsList: Economy,
              BusinessSeatsList: Business,
              FirstSeatsList: First,
              BaggageAllowance: flight.BaggageAllowance,
            },
          }
        ).catch((err) => res.status(400).json("Error:" + err));
        
  Reservation.findByIdAndUpdate({ _id:req.body.BookingNumber},
    {
        ArrCabinClass:CabinClass,
        totalPrice:PriceDifference,
        NumberOfChildren:NumberOfChildren,
        NumberOfAdults:NumberOfAdults,
        returnSeats:req.body.passengers,
    },function (err, docs) {
      if (err) {
         return res.json({
          message: " error",
        });
      } else {
        console.log("Updated Reservation : ", docs);
        return res.json({
        message: "success",
        });
      }
    }
  );}
  else{
    return res.json({
      statusCode: 1,
      error: "sign in please",
    });
  }
};
const updateDiffReturnFlightReservation  = async (req, res) =>{
  try {
    const reservation= await Reservation.findOne({_id:req.body.BookingNumber});
    const valueOfId = req.payload.id;
    const userData = await User.findOne({ _id: valueOfId });
    const arrivalFlight = await Flights.findOne({FlightNumber: req.body.ArrivalFlightNumber});
    const departureFlight = await Flights.findOne({FlightNumber: req.body.DepartureFlightNumber});
    const DepCabinclass = req.body.DepCabinClass;
    const ArrCabinclass = req.body.ArrCabinClass;
    var basePrice = arrivalFlight.Price + departureFlight.Price;
    const NumberOfChildren=req.body.NumberOfChildren;
    const NumberOfAdults=req.body.NumberOfAdults;
    basePrice=(NumberOfAdults*basePrice)+(NumberOfChildren*basePrice*0.5);
    switch (DepCabinclass) {
      case "Economy": {
        basePrice = basePrice;
        break;
      }
      case "First": {
        basePrice *= 2;
        break;
      }
      case "Business": {
        basePrice *= 1.5;
        break;
      }
      default: {
        return res.json({
          statusCode: 1,
          error: "Not a valid class",
        });
      }
    }

    if (userData) {
        var i=0;
        for(i=0;i<userData.UserReservations.length;i++){
          if(userData.UserReservations[i].toString()===req.body.BookingNumber){
            var index = i;
            if (index > -1) {
              userData.UserReservations.splice(index, 1);
            }
          }
        }
        await User.findOneAndUpdate({ _id: userData._id }, userData, null).catch(
          (err) => res.status(400).json("Error:" + err)
        );
      reservation.delete();
      const reserve = await Reservation.create({
        DepartureFlightNumber: departureFlight.FlightNumber,
        ArrivalFlightNumber: arrivalFlight.FlightNumber,
        DepCabinclass: DepCabinclass,
        ArrCabinclass: ArrCabinclass,
        NumberOfChildren:NumberOfChildren,
        NumberOfAdults:NumberOfAdults,
        departureSeats:req.body.depSeats,
        returnSeats:req.body.arrSeats,
        totalPrice: basePrice,
        User: {
          _id: userData._id,
          FirstName: userData.FirstName,
          LastName: userData.LastName,
          Email: userData.Email,
          Phone: userData.Phone,
          PassportNumber: userData.PassportNumber,
          Password: userData.Password,
          Admin: userData.Admin,
          UserReservations: userData.UserReservations,
          Summaries: userData.Summaries,
        },
      });
      const ReserveTobePushed = {
        _id: reserve._id,
        User: reserve.User,
        DepartureFlightNumber: reserve.DepartureFlightNumber,
        DepCabinclass: reserve.DepCabinclass,
        ArrCabinclass: reserve.ArrCabinclass,
        ArrivalFlightNumber: reserve.ArrivalFlightNumber,
        NumberOfChildren: reserve.NumberOfChildren,
        NumberOfAdults: reserve.NumberOfAdults,
        departureSeats:req.body.depSeats,
        returnSeats:req.body.arrSeats,
        totalPrice: reserve.totalPrice,
      };
      userData.UserReservations.push(ReserveTobePushed);
        const oldSeats = reservation.returnSeats;
        const newSeats = req.body.arrSeats;
        const cabin = reservation.ArrCabinClass;
        const newCabin = req.body.ArrCabinClass;
        const flightNumber = reservation.ArrivalFlightNumber;
        var unreserve = [];
        const flight = await Flights.find({ FlightNumber: flightNumber });
        var a = [];
        var Economy = flight[0].EconomySeatsList;
        var Business = flight[0].BusinessSeatsList;
        var First = flight[0].FirstSeatsList;
        if (cabin === "Economy") {
          a = Economy;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          Economy = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
    
        if (cabin === "Business") {
          a = Business;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          Business = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
    
        if (cabin === "First") {
          a = First;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          First = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            console.log(Economy, "ECONOMYY");
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
            console.log(Economy, "ECONOMYY2");
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
    
        Flights.updateOne(
          { FlightNumber: reservation.DepartureFlightNumber },
          {
            $set: {
              FlightNumber: flight.FlightNumber,
              DepartureDate: flight.DepartureDate,
              ArrivalDate: flight.ArrivalDate,
              DepartureTime: flight.DepartureTime,
              ArrivalTime: flight.ArrivalTime,
              EconomySeats: flight.EconomySeats,
              BusinessSeats: flight.BusinessSeats,
              FirstClassSeats: flight.FirstClassSeats,
              ArrivalAirport: flight.ArrivalAirport,
              DepartureAirport: flight.DepartureAirport,
              isDeparture: flight.isDeparture,
              Price: flight.Price,
              TripDuration: flight.TripDuration,
              EconomySeatsList: Economy,
              BusinessSeatsList: Business,
              FirstSeatsList: First,
              BaggageAllowance: flight.BaggageAllowance,
            },
          }
        ).catch((err) => res.status(400).json("Error:" + err));
      await User.findOneAndUpdate({ _id: userData._id }, userData, null).catch((err) => res.status(400).json("Error:" + err));
     }else {
      return res.json({
        statusCode: 1,
        error: "sign in please",
      });
    }
    return res.json({
      statusCode: 0,
      message: "Success",
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }

};
const updateDiffDepartureFlightReservation  = async (req, res) =>{
  try {
    const reservation= await Reservation.findOne({_id:req.body.BookingNumber});
    const valueOfId = req.payload.id;
    const userData = await User.findOne({ _id: valueOfId });
    const arrivalFlight = await Flights.findOne({FlightNumber: req.body.ArrivalFlightNumber});
    const departureFlight = await Flights.findOne({FlightNumber: req.body.DepartureFlightNumber});
    const DepCabinclass = req.body.DepCabinClass;
    const ArrCabinclass = req.body.ArrCabinClass;
    var basePrice = arrivalFlight.Price + departureFlight.Price;
    const NumberOfChildren=req.body.NumberOfChildren;
    const NumberOfAdults=req.body.NumberOfAdults;
    basePrice=(NumberOfAdults*basePrice)+(NumberOfChildren*basePrice*0.5);
    switch (DepCabinclass) {
      case "Economy": {
        basePrice = basePrice;
        break;
      }
      case "First": {
        basePrice *= 2;
        break;
      }
      case "Business": {
        basePrice *= 1.5;
        break;
      }
      default: {
        return res.json({
          statusCode: 1,
          error: "Not a valid class",
        });
      }
    }
    if (userData) {
      var i=0;
        for(i=0;i<userData.UserReservations.length;i++){
          if(userData.UserReservations[i].toString()===req.body.BookingNumber){
            var index = i;
            if (index > -1) {
              userData.UserReservations.splice(index, 1);
            }
          }
        }
      await User.findOneAndUpdate({ _id: userData._id }, userData, null).catch(
        (err) => res.status(400).json("Error:" + err)
      );
      reservation.delete();
      const reserve = await Reservation.create({
        DepartureFlightNumber: departureFlight.FlightNumber,
        ArrivalFlightNumber: arrivalFlight.FlightNumber,
        DepCabinclass: DepCabinclass,
        ArrCabinclass: ArrCabinclass,
        NumberOfChildren:NumberOfChildren,
        NumberOfAdults:NumberOfAdults,
        departureSeats:req.body.depSeats,
        returnSeats:req.body.arrSeats,
        totalPrice: basePrice,
        User: {
          _id: userData._id,
          FirstName: userData.FirstName,
          LastName: userData.LastName,
          Email: userData.Email,
          Phone: userData.Phone,
          PassportNumber: userData.PassportNumber,
          Password: userData.Password,
          Admin: userData.Admin,
          UserReservations: userData.UserReservations,
          Summaries: userData.Summaries,
        },
      });
      const ReserveTobePushed = {
        _id: reserve._id,
        User: reserve.User,
        DepartureFlightNumber: reserve.DepartureFlightNumber,
        DepCabinclass: reserve.DepCabinclass,
        ArrCabinclass: reserve.ArrCabinclass,
        ArrivalFlightNumber: reserve.ArrivalFlightNumber,
        NumberOfChildren: reserve.NumberOfChildren,
        NumberOfAdults: reserve.NumberOfAdults,
        departureSeats:req.body.depSeats,
        returnSeats:req.body.arrSeats,
        totalPrice: reserve.totalPrice,
      };
      userData.UserReservations.push(ReserveTobePushed);
        const oldSeats = reservation.departureSeats;
        const newSeats = req.body.depSeats;
        const cabin = reservation.DepCabinClass;
        const newCabin = req.body.DepCabinClass;
        const flightNumber = reservation.DepartureFlightNumber;
        const NewflightNumber = req.body.DepartureFlightNumber;
        const Newflight = await Flights.find({ FlightNumber: NewflightNumber });
        var unreserve = [];
        const flight = await Flights.find({ FlightNumber: flightNumber });
        var a = [];
        var Economy = flight[0].EconomySeatsList;
        var Business = flight[0].BusinessSeatsList;
        var First = flight[0].FirstSeatsList;
        var newEconomy = Newflight[0].EconomySeatsList;
        var newBusiness = Newflight[0].BusinessSeatsList;
        var newFirst = Newflight[0].FirstSeatsList;
        if (cabin === "Economy") {
          a = Economy;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          Economy = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
    
        if (cabin === "Business") {
          a = Business;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          Business = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
    
        if (cabin === "First") {
          a = First;
          var i = 0;
          for (i; i < a.length; i++) {
            var j = 0;
            for (j; j < oldSeats.length; j++) {
              if (a[i].number === oldSeats[j].passengerSeat) {
                unreserve.push({
                  number: a[i].number,
                  isReserved: false,
                });
                break;
              }
            }
            if (j >= oldSeats.length) {
              unreserve.push(a[i]);
            }
          }
          First = unreserve;
          if (newCabin === "Economy") {
            var i = 0;
            finalSeats = [];
            console.log(Economy, "ECONOMYY");
            for (i; i < Economy.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Economy[i].number === newSeats[j].passengerSeat) {
                  if (Economy[i].isReserved === false) {
                    finalSeats.push({
                      number: Economy[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Economy[i]);
              }
            }
            Economy = finalSeats;
            console.log(Economy, "ECONOMYY2");
          }
    
          if (newCabin === "Business") {
            var i = 0;
            finalSeats = [];
            for (i; i < Business.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (Business[i].number === newSeats[j].passengerSeat) {
                  if (Business[i].isReserved === false) {
                    finalSeats.push({
                      number: Business[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(Business[i]);
              }
            }
            Business = finalSeats;
          }
    
          if (newCabin === "First") {
            var i = 0;
            finalSeats = [];
            for (i; i < First.length; i++) {
              var j = 0;
              for (j; j < newSeats.length; j++) {
                if (First[i].number === newSeats[j].passengerSeat) {
                  if (First[i].isReserved === false) {
                    finalSeats.push({
                      number: First[i].number,
                      isReserved: true,
                    });
                    break;
                  }
                }
              }
              if (j >= newSeats.length) {
                finalSeats.push(First[i]);
              }
            }
            First = finalSeats;
          }
        }
        //if(!(flightNumber===NewflightNumber))
    
        Flights.updateOne(
          { FlightNumber: reservation.DepartureFlightNumber },
          {
            $set: {
              FlightNumber: flight.FlightNumber,
              DepartureDate: flight.DepartureDate,
              ArrivalDate: flight.ArrivalDate,
              DepartureTime: flight.DepartureTime,
              ArrivalTime: flight.ArrivalTime,
              EconomySeats: flight.EconomySeats,
              BusinessSeats: flight.BusinessSeats,
              FirstClassSeats: flight.FirstClassSeats,
              ArrivalAirport: flight.ArrivalAirport,
              DepartureAirport: flight.DepartureAirport,
              isDeparture: flight.isDeparture,
              Price: flight.Price,
              TripDuration: flight.TripDuration,
              EconomySeatsList: Economy,
              BusinessSeatsList: Business,
              FirstSeatsList: First,
              BaggageAllowance: flight.BaggageAllowance,
            },
          }
        ).catch((err) => res.status(400).json("Error:" + err));
      await User.findOneAndUpdate({ _id: userData._id }, userData, null).catch(
        (err) => res.status(400).json("Error:" + err)
      );
    } else {
      return res.json({
        statusCode: 1,
        error: "sign in please",
      });
    }
    return res.json({
      statusCode: 0,
      message: "Success",
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }



};
const getFlightDetails = async (req, res) => {
  try {
    const FlightNumber = req.body.FlightNumber;
    const flight = await Flights.findOne({ FlightNumber });
    return res.json({
      statusCode: 0,
      message: "Success",
      data: flight,
    });
  } catch (exception) {
    return res.json({
      statusCode: 1,
      error: "Exception",
    });
  }
};
module.exports = {
  signIn,
  signUp,
  viewAvailableSeats,
  createFlightReservation,
  deleteReservation,
  createSummary,
  getSummary,
  updateAccount,
  displayaccount,
  selectSeats,
  deselectSeats,
  sendEmail,
  getFutureReservations,
  changePassword,

  Pay,

  updateSameDepartureFlightReservation,
  updateSameArrivalFlightReservation,
  updateDiffReturnFlightReservation,
  updateDiffDepartureFlightReservation, 

  changeSeats,
  updateDepartureFlightReservation,
  getFlightDetails,
};
