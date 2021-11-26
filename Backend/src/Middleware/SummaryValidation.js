const Joi = require("joi");
const { builtinModules } = require("module");

const validateAddSummary = (req, res, next) => {
  const schema = Joi.object({
    DepartureFlight: Joi.string().required(),
    ArrivalFlight: Joi.string().required()
    //userID??
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

module.exports={validateAddSummary};