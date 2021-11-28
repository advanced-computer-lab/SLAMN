const Joi = require("joi");
const { builtinModules } = require("module");

const validateSignin = (req, res, next) => {
  const schema = Joi.object({
    Email: Joi.string().required(),
    Password: Joi.string().required(),
  }).required();
};

const validateCreateReservation = (req, res, next) => {
  const schema = Joi.object({
   FlightNumber: Joi.number().required()
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

const validateDeleteFlightReservation = (req, res, next) => {
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

const validateAddSummary = (req, res, next) => {
  const schema = Joi.object({
    DepartureFlight: Joi.string().required(),
    ArrivalFlight: Joi.string().required()
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

const validateUpdateAccount = (req, res, next) => {
  const schema = Joi.object({
    FirstName:Joi.string().required(),
    LastName: Joi.string().required(),
    Email: Joi.string().required(),
    Phone: Joi.string().required(),
    Password: Joi.string().required(),
    PassportNumber: Joi.string().required(),
    Admin: Joi.boolean().required(),
    UserReservations: Joi.array().required(),
    Summaries: Joi.array().required()
    
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

module.exports = { validateSignin,validateCreateReservation,validateDeleteFlightReservation,validateAddSummary,validateUpdateAccount};
