const mongoose = require('mongoose')
require('dotenv').config()

async function MongoDbConnect(){
    try{
       await mongoose.connect(process.env.mongoDB_connection_compass_url)
       console.log('Mongodb is Connected')
    }
    catch(err){
        console.log(err)
        console.log('Mongodb Connection Failed')
    }
}

module.exports = MongoDbConnect