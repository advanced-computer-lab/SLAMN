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
    const Reservation= await Reservation.findOne({_id});
    const CabinClass=req.body.CabinClass;
    const NumberOfChildren=req.body.NumberOfChildren;
    const NumberOfAdults=req.body.NumberOfAdults;
    const Price=req.body.totalPrice;
    Reservation.updateOne({_id},
      {
        $set: {CabinClass:CabinClass,
          NumberOfChildren:NumberOfChildren,
          NumberOfAdults:NumberOfAdults,
          totalPrice:Price-Reservation.totalPrice,
        },
      }
    )
      .then(() => res.json("reservation updated"))
      .catch((err) => res.status(400).json("Error:" + err));
  };
  module.exports={createFlightReservation,deleteReservation,updateFlightReservation};