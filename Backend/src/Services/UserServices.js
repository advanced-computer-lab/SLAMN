const User = require("../Models/UserModel");
const Summary = require("../Models/SummaryModel");
const Reservation = require("../Models/FlightReservation");
const nodemailer = require("nodemailer");
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

const createFlightReservation = async (req, res) => {
  try {
    console.log(req.body);
    const valueOfId = req.payload.id;
    const userData = await User.findOne({ _id: valueOfId });
    //  const userData = await User.findOne({ _id: "61acf8804f22c4507b340a83"});

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
        NumberOfPassengers: noOfPassengers,
        totalPrice: basePrice * noOfPassengers,
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
      userData.UserReservations.forEach((element) => {
        if (element._id === req.body._id) {
          var index = userData.UserReservations.indexOf(element);
          if (index > -1) {
            userData.UserReservations.splice(index, 1);
          }
        }
      });
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
        error: "Can't delte this reservation",
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
const updateFlightReservation = async (req, res) => {
  const reservation= await Reservation.findOne({_id:req.body.BookingNumber});
  const CabinClass=req.body.CabinClass;
  const NumberOfChildren=req.body.NumberOfChildren;
  const NumberOfAdults=req.body.NumberOfAdults;
  const NumberOfPassengers=req.body.NumberOfChildren+req.body.NumberOfAdults;
  console.log("no of passengers",NumberOfPassengers);
  var basePrice=(NumberOfAdults*req.body.Price)+(NumberOfChildren*req.body.Price*0.5);
  var emptySeats=0;
  var enoughSeats=false;
  console.log("old price",reservation.totalPrice);
  console.log("new price",basePrice);
  const PriceDifference=basePrice-reservation.totalPrice;
  console.log("diffrence",PriceDifference);
  const valueOfId = req.payload.id;
  console.log("iddddd",valueOfId);
  const userData = await User.findOne({ _id: valueOfId });
  console.log("userrrr",userData);
  if(userData){
    console.log("bodyyyyyy",req.body); 
    console.log("reservation idddddd",req.body.BookingNumber); 
    
      if(NumberOfPassengers>reservation.NumberOfPassengers){
        //check if there is enough seats
        switch (CabinClass) {
          case "Economy": {
            for(i=0;i<EconomySeatsList.length;i++){
              if(EconomySeatsList[i].isReserved==false)
                 emptySeats++;
              if(emptySeats==NumberOfPassengers){
                enoughSeats=true;
                break;
              }
            }
            break;
          }
          case "First": {
            for(i=0;i<FirstSeatsList.length;i++){
              if(FirstSeatsList[i].isReserved==false)
                 emptySeats++;
              if(emptySeats==NumberOfPassengers){
                enoughSeats=true;
                break;
              }
            }
            break;
          }
          case "Business": {
            for(i=0;i<BusinessSeatsList.length;i++){
              if(BusinessSeatsList[i].isReserved==false)
                 emptySeats++;
              if(emptySeats==NumberOfPassengers){
                enoughSeats=true;
                break;
              }
            }
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
      else{
        enoughSeats=true;
        if(NumberOfPassengers>reservation.NumberOfPassengers){
          //call update seats
        }
      }
      if(!enoughSeats){
        return res.json({
          statusCode: 1,
          error: "No available empty seats",
        });
      }
      if(reservation.CabinClass!=CabinClass){
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
        if(reservation.seat==req.body.seat){
          return res.json({
            message: "you have to change your seat",
          });
          
        }
        // else{
        //   call update seat
        // }
        }
  Reservation.findByIdAndUpdate({ _id:req.body.BookingNumber},
    {
        DepCabinClass:CabinClass,
        totalPrice:PriceDifference,
        NumberOfPassengers:NumberOfPassengers,
        NumberOfChildren:NumberOfChildren,
        NumberOfAdults:NumberOfAdults,
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
// const getFutureReservations = async (req, res) => {
//   try {
//     const valueOfId = req.payload.id;
//     const userData = await User.findOne({ _id: valueOfId });

//     // const userData=await User.findOne({ _id: "61a7780f866bf0ec6787692a"});
//     var date = new Date();
//     console.log(date, "dateeeee");

//     if (userData) {
//       console.log(userData);
//       let reservations = await Reservation.find({ User: userData });
//       let result = [];
//       var reservationresult;
//       //console.log(reservations);
//       const arr = reservations.map((res) => res.DepartureFlightNumber);
//       console.log(arr);
//       for (var i = 0; i < arr.length; i++) {
//         var flight = await Flights.findOne({ FlightNumber: arr[i] });
//         console.log(flight.DepartureDate);
//         if (flight.DepartureDate > req.body.date) {
//           reservationresult = await Reservation.find({
//             User: userData,
//             DepartureFlightNumber: flight.FlightNumber,
//           });
//           result.push(reservationresult);
//           console.log("dakhal");
//         }
//       }

//       console.log(result);

//       return res.json({
//         statusCode: 0,
//         message: "Success",
//         data: result,
//       });
//     } else {
//       return res.json({
//         statusCode: 1,
//         error: "sign in please",
//       });
//     }
//   } catch (exception) {
//     console.log(exception);
//     return res.json({
//       statusCode: 1,
//       error: "exception",
//     });
//   }
// };
// const sendEmail = (req, res) => {
//   let userEmail = req.body.email;
//   let emailSubject = req.body.emailSubject;
//   let emailBody = req.body.emailBody;

//   let transporter = nodemailer.createTransport({
//     service: "outlook",
//     auth: {
//       user: "slamndamn@outlook.com",
//       pass: "slamn123",
//     },
//   });

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
  updateFlightReservation
};
