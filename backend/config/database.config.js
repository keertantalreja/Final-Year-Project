const mongoose = require('mongoose');
const { databaseConnectionMessages } = require('../constant/api_response');

const database_conenction = async()=>{
    const connection = await mongoose.connect(`${process.env.MONGOURL}`)
    if (!connection){
        console.log(databaseConnectionMessages.failure)
    }
    else{
        console.log(databaseConnectionMessages.success)
    }
}

module.exports = database_conenction