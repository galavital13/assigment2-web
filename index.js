require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authMiddleware = require("./middleware/authMiddleware");
const errorHandler = require("./errors/errorHandler");
const error = require("./errors/error");
const connectDB = require("./db/db");
const itemsRouter = require("./router/itemsRouter");
const logger = require("./logger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authMiddleware);
app.use("/items", itemsRouter);
app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
