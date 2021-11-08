const Joi = require("joi");
const { builtinModules } = require("module");

const validateAddFlight = (req, res, next) => {
  const schema = Joi.object({
    FlightNumber: Joi.number().required(),
    DepartureDate: Joi.date().required(),
    ArrivalDate: Joi.date().required(),
    EconomySeats: Joi.number().required(),
    BusinessSeats: Joi.number().required(),
    Airport: Joi.string().required(),
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
    DepartureDate: Joi.date(),
    ArrivalDate: Joi.date(),
    EconomySeats: Joi.number(),
    BusinessSeats: Joi.number(),
    Airport: Joi.string(),
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
