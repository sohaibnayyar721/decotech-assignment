const express = require("express");
const cors = require("cors");
const MongoDbConnect = require('./mongoDB/connection')
const eventsRoute = require('./routes/eventRoute')
require("dotenv").config();

const app = express();

MongoDbConnect()

app.use(cors());
app.use(express.json());
app.use(eventsRoute)

app.get('/', (req, res)=>{
  return res.status(200).json({message: "Hello world"})
})

app.listen(process.env.PORT, () =>
  console.log(`Server is Running on PORT: ${process.env.PORT}`)
);
