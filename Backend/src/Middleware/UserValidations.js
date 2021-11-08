const Joi = require("joi");
const { builtinModules } = require("module");

const validateSignin = (req, res, next) => {
  const schema = Joi.object({
    Email: Joi.string().required(),
    Password: Joi.string().required(),
  }).required();
};

module.exports = { validateSignin };
