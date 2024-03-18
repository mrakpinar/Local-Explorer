const mongoose = require("mongoose");
const colors = require("colors");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Database connected -> ${mongoose.connection.host}`.bgWhite.red
    );
  } catch (error) {
    console.log(`Connection Error -> ${error}`.bgRed.white);
  }
};

module.exports = dbConnection;
