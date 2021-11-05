const Joi =require('joi')
const { builtinModules } = require('module')

const validateAddFlight = (req,res,next) =>{
    const schema = Joi.object({

          FlightNumber: Joi.number().required(),
          DepartureDate: Joi.Date().required(),
          ArrivalDate: Joi.Date().required(),
          EconomySeats: Joi.number().required(),
          BusinessSeats: Joi.number().required(),
          Airport: Joi.string().required(),
        }).required(),


        const isValid = schema.validate(req.body)
        if (isValid.error) {
          return res.json({
            statusCode: 1,
            
            error: isValid.error.details[0].message,
          })
        }
        return next()

      
}
modules.export ={validateAddFlight}