const Joi = require("joi");
// const { builtinModules } = require("module");
// const { join } = require("path/posix");

const validateSignin = (req, res, next) => {
  const schema = Joi.object({
    Email: Joi.string().required(),
    Password: Joi.string().required(),
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

const validateSignup = (req, res, next) => {
  const schema = Joi.object({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    Email: Joi.string().required(),
    Phone: Joi.string().required(),
    HomeAddress: Joi.string().required(),
    CountryCode: Joi.string().required(),
    Password: Joi.string().required(),
    PassportNumber: Joi.string().required(),
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
const validatePassword = (req, res, next) => {
  const schema = Joi.object({
    Password: Joi.string().required(),
    newPassword: Joi.string().required(),
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

const validateSeats = (req, res, next) => {
  const schema = Joi.object({
    FlightNumber: Joi.string().required(),
    Cabin: Joi.string().required(),
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

const validateSelection = (req, res, next) => {
  const schema = Joi.object({
    FlightNumber: Joi.string().required(),
    Cabin: Joi.string().required(),
    seat: Joi.string().required(),
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

const validateCreateReservation = (req, res, next) => {
  const schema = Joi.object({
    DepartureFlightNumber: Joi.number().required(),
    ArrivalFlightNumber: Joi.number().required(),
    DepCabinClass: Joi.string().required(),
    ArrCabinClass: Joi.string().required(),
    NumberOfPassengers: Joi.number().required(),
    depSeats:Joi.array().required(),
    arrSeats:Joi.array().required()
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
    _id: Joi.string().required(),
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
    DepartureFlightNumber: Joi.number().required(),
    ArrivalFlightNumber: Joi.number().required(),
    returnSeats: Joi.array().required(),
    returnCabin: Joi.string().required(),
    departureSeats: Joi.array().required(),
    departureCabin: Joi.string().required(),
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
const validateDeselection = (req, res, next) => {
  const schema = Joi.object({
    FlightNumber: Joi.string().required(),
    Cabin: Joi.string().required(),
  }).required();
};

const validateUpdateAccount = (req, res, next) => {
  const schema = Joi.object({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    Email: Joi.string().required(),

    PassportNumber: Joi.string().required(),
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
const validateUpdateSameDepartureReservation = (req, res, next) => {
  const schema = Joi.object({
    BookingNumber: Joi.string().required(),
    CabinClass: Joi.string().required(),
    NumberOfChildren: Joi.number().required(),
    NumberOfAdults: Joi.number().required(),
    Price: Joi.number().required(),
    passengers:Joi.array().required()
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
const validateUpdateSameArrivalReservation = (req, res, next) => {
  const schema = Joi.object({
    BookingNumber: Joi.string().required(),
    CabinClass: Joi.string().required(),
    NumberOfChildren: Joi.number().required(),
    NumberOfAdults: Joi.number().required(),
    Price: Joi.number().required(),
    passengers:Joi.array().required()
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
const validateupdateDiffReturnReservation = (req, res, next) => {
  const schema = Joi.object({
    BookingNumber: Joi.string().required(),
    DepartureFlightNumber: Joi.number().required(),
    ArrivalFlightNumber: Joi.number().required(),
    DepCabinClass: Joi.string().required(),
    ArrCabinClass: Joi.string().required(),
    NumberOfChildren: Joi.number().required(),
    NumberOfAdults: Joi.number().required(),
    depSeats:Joi.array().required(),
    arrSeats:Joi.array().required()
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
const validateupdateDiffDepartureReservation = (req, res, next) => {
  const schema = Joi.object({
    BookingNumber: Joi.string().required(),
    DepartureFlightNumber: Joi.number().required(),
    ArrivalFlightNumber: Joi.number().required(),
    DepCabinClass: Joi.string().required(),
    ArrCabinClass: Joi.string().required(),
    NumberOfChildren: Joi.number().required(),
    NumberOfAdults: Joi.number().required(),
    depSeats:Joi.array().required(),
    arrSeats:Joi.array().required()
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
  validateSignin,
  validateSignup,
  validateCreateReservation,
  validateDeleteFlightReservation,
  validateAddSummary,
  validateUpdateAccount,
  validateSeats,
  validateSelection,
  validatePassword,
  validateUpdateSameDepartureReservation,
  validateUpdateSameArrivalReservation,
  validateupdateDiffReturnReservation,
  validateupdateDiffDepartureReservation
};
