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
    /*const payload = jwt.verify(req.headers["auth"], process.env.SECRET);
    const userData = payload.id;*/
    const userData=await User.findOne({_id:"61a7780f866bf0ec6787692a"});
    const arrivalFlight=await Flight.findOne({FlightNumber:req.body.ArrivalFlightNumber});
    const departureFlight=await Flight.findOne({FlightNumber:req.body.DepartureFlightNumber}); 
    const Cabinclass=req.body.CabinClass; 
    var basePrice=arrivalFlight.Price+departureFlight.Price;
    const noOfChildren=req.body.NumberOfChildren;
    const noOfAdults=req.body.NumberOfAdults;
    
    switch(Cabinclass){
      case "Economy":{basePrice=basePrice;break;}
      case "First Class":{basePrice+=700;break;}
      case "Business Class":{basePrice+=1000;break;}
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
        User:{
          _id:userData._id,
          FirstName:userData.FirstName,
          LastName:userData.LastName,
          Email:userData.Email,
          Phone:userData.Phone ,
          PassportNumber:userData.PassportNumber,
          Password:userData.Password , 
          Admin:userData.Admin,
          UserReservations:userData.UserReservations,
          Summaries:userData.Summaries ,
        }});
      const ReserveTobePushed={
        _id:reserve._id,
        User: reserve.User,
        DepartureFlightNumber:reserve.DepartureFlightNumber,
        ArrivalFlightNumber:reserve.ArrivalFlightNumber,
        CabinClass:reserve.CabinClass,
        NumberOfChildren:reserve.NumberOfChildren,
        NumberOfAdults:reserve.NumberOfAdults,
        totalPrice:reserve.totalPrice
      };
      userData.UserReservations.push(ReserveTobePushed);
       
await User.findOneAndUpdate({_id: userData._id}, 
  userData, null)
     .catch((err) => res.status(400).json("Error:" + err));
      
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
 /*const payload = jwt.verify(req.headers["auth"], process.env.SECRET);
    const userData = payload.id;*/
    const userData=await User.findOne({_id:"61a7780f866bf0ec6787692a"});
    const ReservationToBeDeleted = await Reservation.findOne({_id:req.body._id});
    if(userData){
    console.log(ReservationToBeDeleted);
    //userData.UserReservations.pop(ReservationToBeDeleted);
    userData.UserReservations.forEach(element => {
      if(element._id==req.body._id)
        {
          var index=userData.UserReservations.indexOf(element);
          if (index > -1) {
            userData.UserReservations.splice(index, 1);
          }
        }
   });
    await User.findOneAndUpdate({_id: userData._id}, 
      userData, null)
         .catch((err) => res.status(400).json("Error:" + err));
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
    
 /*const payload = jwt.verify(req.headers["auth"], process.env.SECRET);
    const userData = payload.id;*/
    const userData=await User.findOne({_id:"61a779f2840b32d7a8b789a1"});
    const arrivalFlight=await Flight.findOne({FlightNumber:req.body.ArrivalFlightNumber});
    const departureFlight=await Flight.findOne({FlightNumber:req.body.DepartureFlightNumber});
    const totalPrice=arrivalFlight.Price+departureFlight.Price;
    // console.log(departureFlight);
    // console.log(arrivalFlight);
    
    if(userData){
      const sumUP=await Summary.create({
        DepartureFlightNumber:departureFlight.FlightNumber,
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
        User:{
          _id:userData._id,
          FirstName:userData.FirstName,
          LastName:userData.LastName,
          Email:userData.Email,
          Phone:userData.Phone ,
          PassportNumber:userData.PassportNumber,
          Password:userData.Password , 
          Admin:userData.Admin,
          UserReservations:userData.UserReservations,
          Summaries:userData.Summaries ,
        },
        Price:totalPrice});
        
      userData.Summaries.push(sumUP);
             
await User.findOneAndUpdate({_id: userData._id}, 
  userData, null)
     .catch((err) => res.status(400).json("Error:" + err));
      // console.log(sumUP);
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
      data:sumUP,
    });
  }
   catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};




const getSummary = async (req, res) => {
  
  try {
    const arrivalFlight=await Flight.findOne({FlightNumber:req.body.ArrivalFlightNumber});
    const departureFlight=await Flight.findOne({FlightNumber:req.body.DepartureFlightNumber}); 
    /*const payload = jwt.verify(req.headers["auth"], process.env.SECRET);
      const userData = payload.id;*/
      const userData=await User.findOne({_id:"61a779f2840b32d7a8b789a1"}).populate("Summaries");
      const data=await Summary.findOne({User:userData,ArrivalFlightNumber:arrivalFlight.FlightNumber,DepartureFlight:departureFlight.FlightNumber});
      console.log(data);
    if(userData) {
     
      
      
      
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
  
  

const updateAccount = async (req, res) =>{
 
 const UpdatedUser = {
 
  FirstName:req.body.FirstName,
  LastName:req.body.LastName,
  Email:req.body.Email,
  Phone:req.body.Phone ,
  PassportNumber:req.body.PassportNumber,
  Password:req.body.Password ,
  Admin:req.body.Admin,
  UserReservations:req.body.UserReservations,
  Summaries:req.body.Summaries
 };
   
 
await User.findOneAndUpdate({PassportNumber: req.body.PassportNumber }, 
  UpdatedUser, null)
     .then(() => res.json(UpdatedUser))
     .catch((err) => res.status(400).json("Error:" + err));
 
 
 };

 
 
 

module.exports = { signIn,signUp,viewAvailableSeats,createFlightReservation,deleteReservation,createSummary,
getSummary,updateAccount};


