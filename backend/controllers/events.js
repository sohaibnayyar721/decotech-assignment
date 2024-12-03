const eventModel = require('../model/eventScehma')

exports.postEvent = async(req, res)=> {
    let {date, eventName, startTime, endTime} = req.body
    try{
        let saveDate = new eventModel({date, eventName, startTime, endTime})
        await saveDate.save()
        return res.status(200).json({message: 'Event Save Successfully'})

    }catch(err){
        res.status(500).json({message: 'Internal Server Error'})
    }
}