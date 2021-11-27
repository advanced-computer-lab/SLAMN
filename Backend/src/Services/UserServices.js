const User = require("../Models/UserModel");
const Summary=require("../Models/SummaryModel");
const Reservation = require("../Models/FlightReservation");
const Flight = require("../Models/FlightModel");


const signIn = async (req, res) => {
  const email = req.body.Email;
  const password = req.body.password;

  try {
    const data = await User.find({ Email: email });
    if (data) {
      if (data.password === password) {
        return res.json({
          statusCode: 0,
          message: "Success",
          data: data.Admin,
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
    const userData=await User.findOne({_id});
    const arrivalFlight=await Flight.findOne(req.body.ArrivalFlight);
    const departureFlight=await Flight.findOne(req.body.DepartureFlight);    if(userData){
      const reserve=await Reservation.create({DepartureFligh:departureFlight,ArrivalFlight:arrivalFlight,User:userData});
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
    const ReservationToBeDeleted = await Reservation.findOne({_id});
    const userData=await User.findOne({_id});
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
    const userData=await User.findOne({_id});
    const arrivalFlight=await Flight.findOne(req.body.ArrivalFlight);
    const departureFlight=await Flight.findOne(req.body.DepartureFlight);
    const totalPrice=arrivalFlight.Price+departureFlight.Price;

    if(userData){
      const sumUP=await Summary.create({DepartureFlight:departureFlight,ArrivalFlight:arrivalFlight,User:userData,Price:totalPrice});
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
  const arrivalFlight=req.body.ArrivalFlight;
  const depFlight=req.body.DepartureFlight;
  const userData=await User.findOne({_id});
  if(userData) {
    const data = await Summary.find({ArrivalFlight:arrivalFlight,DepartureFlight:depFlight});
  return res.json({
    statusCode: 0,
    message: "Success",
    data: data,
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

module.exports = { signIn,viewAvailableSeats,createFlightReservation,deleteReservation,createSummary,
getSummary};
