const Joi = require("joi");
const { builtinModules } = require("module");

const validateCreateReservation = (req, res, next) => {
    const schema = Joi.object({
     //Flight:??
     //User:??
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
  module.exports={validateCreateReservation};