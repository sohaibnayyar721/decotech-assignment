const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    date: String,
    eventName: String,
    startTime: String,
    endTime: String,
})

const eventModel = mongoose.model('events', eventSchema)

module.exports = eventModel