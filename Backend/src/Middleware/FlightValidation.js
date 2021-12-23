const Joi = require("joi");
const { builtinModules } = require("module");

const validateAddFlight = (req, res, next) => {
  const schema = Joi.object({
    FlightNumber: Joi.number().required(),
    DepartureDate: Joi.string().required(),
    ArrivalDate: Joi.string().required(),
    DepartureTime: Joi.string().required(),
    ArrivalTime: Joi.string().required(),
    EconomySeats: Joi.number().required(),
    BusinessSeats: Joi.number().required(),
    FirstClassSeats: Joi.number().required(),
    DepartureAirport: Joi.string().required(),
    ArrivalAirport: Joi.string().required(),
    Price: Joi.number().required(),
    TripDuration: Joi.string().required(),
    BaggageAllowance: Joi.number().required(),
    isDeparture:Joi.boolean().required(),
    Price:Joi.number().required(),
    TripDuration:Joi.string().required()
  }).required();

  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.json({
      statusCode: 1,

      error: isValid.error.details[0].message,
    });
  }
  return next();
};
const validateDeleteFlight = (req, res, next) => {
  const schema = Joi.object({
    FlightNumber: Joi.number().required(),
  }).required();

  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.json({
      statusCode: 1,
      error: isValid.error.details[0].message,
    });
  }
  return next();
};
const validateSearchFlight = (req, res, next) => {
  const schema = Joi.object({
    FlightNumber: Joi.number(),
    DepartureDate: Joi.string(),
    ArrivalDate: Joi.string(),
    DepartureTime: Joi.string(),
    ArrivalTime: Joi.string(),
    EconomySeats: Joi.number(),
    BusinessSeats: Joi.number(),
    DepartureAirport: Joi.string(),
    ArrivalAirport: Joi.string(),
  }).required();

  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.json({
      statusCode: 1,

      error: isValid.error.details[0].message,
    });
  }
  return next();
};

module.exports = {
  validateAddFlight,
  validateDeleteFlight,
  validateSearchFlight,
};
