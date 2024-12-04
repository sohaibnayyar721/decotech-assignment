const eventModel = require("../model/eventScehma");

exports.postEvent = async (req, res) => {
  let { date, eventName, startTime, endTime } = req.body;
  try {
    let saveDate = new eventModel({ date, eventName, startTime, endTime });
    await saveDate.save();
    return res.status(200).json({ message: "Event Save Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getEvent = async (req, res) => {
  try {
    let getAllEvents = await eventModel.find({});
    if (getAllEvents.length === 0) {
      return res.status(404).json({ message: "No Events Found" });
    }
    return res.status(200).json({ events: getAllEvents });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal Server Error" });
  }
};
