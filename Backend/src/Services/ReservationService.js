const Flight = require("../Models/FlightModel");
const Reservation = require("../Models/FlightReservation");

const createFlightReservation = async (req, res) => {
    try {
      console.log(req.body);
      await Reservation.create(req.body);
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
      console.log(ReservationToBeDeleted);
      ReservationToBeDeleted.delete();
      return res.json({
        statusCode: 0,
        message: "Success",
      });
    } catch (exception) {
      return res.json({
        statusCode: 1,
        error: "Exception",
      });
    }
  };
  const updateFlightReservation = async (req, res) => {
    const reservation= await Reservation.findOne({_id});
    const CabinClass=req.body.CabinClass;
    const NumberOfChildren=req.body.NumberOfChildren;
    const NumberOfAdults=req.body.NumberOfAdults;
    const Price=req.body.totalPrice;
    const valueOfId = req.payload.id;
    const userData = await User.findOne({ _id: valueOfId });
    if(userData){
    Reservation.findByIdAndUpdate({_id},
      {
          CabinClass:CabinClass,
          NumberOfChildren:NumberOfChildren,
          NumberOfAdults:NumberOfAdults,
          totalPrice:Price-Reservation.totalPrice,
        
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
  module.exports={createFlightReservation,deleteReservation,updateFlightReservation};