const mongoose = require("mongoose");
const logger = require("../logger");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.Cluster}.a0pz4te.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    );
  } catch (error) {
  }
};

module.exports = connectDB;
