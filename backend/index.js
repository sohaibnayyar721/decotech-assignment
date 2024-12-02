const express = require("express");
const cors = require("cors");
const { getConnectionFromPool } = require("./connection");
const { queryRunner } = require("./querryRunner");
const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
const MongoDbConnect = require('./mongoDB/connection')
require("dotenv").config();

const app = express();

// getConnectionFromPool();
MongoDbConnect()

app.use(cors());
app.use(express.json());
app.use(productRoute)
app.use(userRoute)

// app.get("/getScout", async (req, res) => {
//   let { page = 1, limit = 5, search } = req.query;
//   let offSet = (page - 1) * limit;

//   console.log("search: ", search)

//   const [limitedResults, totalCountResult] = await Promise.all([
//     queryRunner(
//       `SELECT * FROM scout ${
//         search ? "WHERE projectName LIKE ?" : ""
//       } LIMIT ? OFFSET ?`,
//       search ? [`%${search}%`, limit, offSet] : [limit, offSet]
//     ),
//     queryRunner("SELECT COUNT(*) AS total_count FROM scout"),
//   ]);

//   if (limitedResults[0]?.length === 0) {
//     return res.status(404).json({ message: "No Data Found" });
//   }
  
//   let checkNextPage = (page - 1 + 1) * limit;
//   let hasNextPage =
//   checkNextPage >= totalCountResult[0][0]?.total_count ? true : false;
  

//   return res.json({
//     totalCount: totalCountResult[0],
//     scouts: limitedResults[0],
//     hasNextPage: hasNextPage,
//   });

//   return res.json({
//     totalCount: totalCountResult[0],
//     scouts: limitedResults[0],
//     hasNextPage: hasNextPage,
//   });


// });

app.listen(process.env.PORT, () =>
  console.log(`Server is Running on PORT: ${process.env.PORT}`)
);
