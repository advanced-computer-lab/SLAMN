const User = require("../Models/UserModel");
const Summary=require("../Models/SummaryModel");

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

// const createSummary = async (req, res) => {
//   const email = req.body.Email;
//   try {
//     const data = await User.find({ Email: email });
//     if(data){
//       data.Summaries.DepartureFlight=req.DepartureFlight;
//       data.Summaries.ArrivalFlight=req.ArrivalFlight;
//       data.Summaries.price=data.Summaries.DepartureFlight.price+data.Summaries.ArrivalFlight.price;
//     }
//     else {
//       return res.json({
//         statusCode: 1,
//         error: "Invalid Email",
//       });
//     }
//   } catch (exception) {
//     return res.json({
//       statusCode: 1,
//       error: "exception",
//     });
//   }
// };

// const viewSummary = async (req, res) => {
//   const email = req.body.Email;
//   try {
//     const data = await User.find({ Email: email });
//     if(data){
//       DepartureFlight=req.DepartureFlight;
//       ArrivalFlight=req.ArrivalFlight;
//       price=DepartureFlight.price+ArrivalFlight.price;
//     }
//     else {
//       return res.json({
//         statusCode: 1,
//         error: "Invalid Email",
//       });
//     }
//   } catch (exception) {
//     return res.json({
//       statusCode: 1,
//       error: "exception",
//     });
//   }
// };



module.exports = { signIn,viewAvailableSeats };
