const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const dbConnection = require("./config/db");

//dotenv
dotenv.config();

// MongoDb Connection
dbConnection();

//Rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", require("./routes/userRoute"));
app.use("/api/v1/post", require("./routes/postRoute"));

// PORT
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgBlue.cyan);
});
