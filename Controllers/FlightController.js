var express = require('express');
var router = express.Router();
const Flight = require('../Models/Flight');
const User = require('../Models/User');
const chalk = require('chalk');

router.delete('/delete-flight/:flightNumber', (req,res)=>{
    if(User.Admin==true){
    Flight.findOneAndDelete({FlightNumber:req.params.flightNumber}).then(result =>{
        res.status(200).send("Flight Deleted ");
        console.log(chalk.bold.red("The Flight is deleted successfully !"));
    }).catch(err => {
        console.log(err);
      });
    }
    else
       console.log(chalk.bold.red("unauthorized action"));

  });
  module.exports = router;