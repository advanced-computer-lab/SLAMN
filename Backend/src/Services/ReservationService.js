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
  module.exports={createFlightReservation,deleteReservation};