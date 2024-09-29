const mongoose = require('mongoose')


const AppliedJudgeSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    education:{type:String,required:true},
    cv:{type:String,required:true},
    age:{type:Number,required:true},
    phonenumber:{type:String,required:true},
    accepted:{type:Boolean,default:false},
    rejected:{type:Boolean,default:false}
})


const AppliedJudge = mongoose.model('AppliedJudge',AppliedJudgeSchema,'AppliedJudge')