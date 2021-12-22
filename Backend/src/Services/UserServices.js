const User = require("../Models/UserModel");
const Summary=require("../Models/SummaryModel");
const Reservation = require("../Models/FlightReservation");
const Flight = require("../Models/FlightModel");
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
            email: data.email,
            password: data.Password,
          },
          process.env.SECRET,
          {
            expiresIn: "5h",
          }
        );
        res.setHeader("auth", token);
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
    cabin = req.Cabin;
    flight = req.FlightNumber;
  } catch (exception) {
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};

const createFlightReservation = async (req, res) => {
  try {
    console.log(req.body);
    const payload = jwt.verify(req.headers["auth"], process.env.SECRET);
    const userData = payload.id;
    const arrivalFlight=await Flight.findOne({FlightNumber:req.body.ArrivalFlightNumber});
    const departureFlight=await Flight.findOne({FlightNumber:req.body.DepartureFlight}); 
    const Cabinclass=req.body.CabinClass; 
    const basePrice=arrivalFlight.Price+departureFlight.Price;
    const noOfChildren=req.body.NumberOfChildren;
    const noOfAdults=req.body.NumberOfAdults;
    switch(Cabinclass){
      case "Economy":{basePrice=basePrice;break;}
      case "First Class":{basePrice=700+basePrice;break;}
      case " Business Class":{basePrice=basePrice+1000;break;}
      default:{return res.json({
        statusCode: 1,
        error: "Not a valid class",
      });}
    }
    if(userData){
      const reserve=await Reservation.create({
        DepartureFlightNumber:departureFlight.FlightNumber,
        ArrivalFlightNumber:arrivalFlight.FlightNumber,
        NumberOfChildren:noOfChildren,
        NumberOfAdults:noOfAdults,
        totalPrice:((basePrice*0.5)*noOfChildren)+(basePrice*noOfAdults),
        User:userData});
      userData.UserReservations.push(reserve);
    }
    else {
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
    const payload = jwt.verify(req.headers["auth"], process.env.SECRET);
    const userData = payload.id;
    const ReservationToBeDeleted = await Reservation.findOne({_id});
    if(userData){
    console.log(ReservationToBeDeleted);
    userData.UserReservations.pop(ReservationToBeDeleted);
    ReservationToBeDeleted.delete();
    return res.json({
      statusCode: 0,
      message: "Success",
    });
  }
  else {
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

const createSummary= async (req, res) => {
  try {
    console.log(req.body);
    const payload = jwt.verify(req.headers["auth"], process.env.SECRET);
    const userData = payload.id;
    const arrivalFlight=await Flight.findOne(req.body.ArrivalFlight);
    const departureFlight=await Flight.findOne(req.body.DepartureFlight);
    const totalPrice=arrivalFlight.Price+departureFlight.Price;

    if(userData){
      const sumUP=await Summary.create({
        DepartueFlightNumber:departureFlight.FlightNumber,
        ArrivalFlightNumber:arrivalFlight.FlightNumber,
        DepartureDepartureDate:departureFlight.DepartureDate,
        DepartureArrivalDate:departureFlight.ArrivalDate,
        ArrivalDepartureDate:arrivalFlight.DepartureDate,
        ArrivalArrivalDate:arrivalFlight.ArrivalDate,
        DepartureDepartureTime:departureFlight.DepartureTime,
        DepartureArrivalTime:departureFlight.ArrivalTime,
        ArrivalDepartureTime:arrivalFlight.DepartureTime,
        ArrivalArrivalTime:arrivalFlight.ArrivalTime,
        DepartuePrice:departureFlight.Price,
        ArrivalPrice:arrivalFlight.Price,
        CabinClass:req.body.cabin,
        SeatNumber:req.body.seat,
        User:userData,
        Price:totalPrice});
      userData.Summaries.push(sumUP);
    }
    else {
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

const getSummary = async (req, res) => {
  
try {
  const arrivalFlight=await Flight.findOne(req.body.ArrivalFlight);
  const departureFlight=await Flight.findOne(req.body.DepartureFlight);
  // const payload = jwt.verify(req.headers["auth"], process.env.SECRET);
  // const userData = payload.id;
  const userData=await User.findOne({_id:"61a7780f866bf0ec6787692a"}).populate("Summaries");

  if(userData) {
    // const data = await userData.Summaries.find({ArrivalFlightNumber:arrivalFlight.FlightNumber,DepartureFlight:departureFlight.FlightNumber});
    const initialdata= Summary.findOne({_id:"61ab8368ada93fdb7aab0c5e"});
    console.log(initialdata);
    return res.json({
    statusCode: 0,
    message: "Success",
   // data: data,
  });
}
else {
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

module.exports = { signIn,signUp,viewAvailableSeats,createFlightReservation,deleteReservation,createSummary,
getSummary};
