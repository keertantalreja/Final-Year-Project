const joi = require('joi');


const hackathonValidation = (req,res,next)=>{
    let validation = joi.object().keys({
        title:joi.string().required(),
        description:joi.string().required(),
        participant:joi.string(),
        startingDate:joi.date().required(),
        endingDate:joi.date().required(),
        testDuration:joi.number().required(),
        coverImage:joi.string().required(),
        question:joi.string().required
    })

    let {error} = validation.validate(req.body,{abortEarly:false})
    if (!error){
        next()
    }
    else{
        res.status(statusCode?.forbidden).json({message:error.message})
    }
}

module.exports = {hackathonValidation}