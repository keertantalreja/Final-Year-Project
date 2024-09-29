const joi = require('joi');
const { statusCode } = require('../../../constant/api_response');


const RegisterValidation = (req,res,next)=>{
    let validation = joi.object().keys({
        firstname:joi.string().required(),
        lastname:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required(),
        phone:joi.string().required(),
        city:joi.string().required()
    })

    const {error} = validation.validate(req.body,{abortEarly:false})
    if(error){
        res.status(statusCode?.forbidden).json({message:error.message})
    }
    else{
        next()
    }
}

const LoginValidation = (req,res,next)=>{
    let validation = joi.object().keys({
        email:joi.string().email().required(),
        password:joi.string().required()
    })
    const {error} = validation.validate(req.body,{abortEarly:false})
    if(error){
        res.status(statusCode?.forbidden).json({message:error.message})
    }
    else{
        next()
    }
}

module.exports = {RegisterValidation,LoginValidation}