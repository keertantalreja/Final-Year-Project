const mongoose = require('mongoose');

const JudgeAccountSchema = mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String,default:null},
    cv:{type:String,default:null},
    degree:{type:String,default:null},
    specialized:{type:String,default:null},
    otp:{type:String,default:null},
    otpVerified:{type:Boolean,default:false},
    validTill:{type:Number,default:null},
    city:{type:String,required:true},
    phone:{type:String,required:true},
    approved:{type:Boolean,default:false},
    decline:{type:Boolean,default:false},
    working:{type:Boolean,default:false}
})

const JudgeAccount = new mongoose.model('JudgeAccount',JudgeAccountSchema,'JudgeAccount')

module.exports = JudgeAccount