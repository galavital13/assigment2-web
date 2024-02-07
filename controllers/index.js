const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('../db/db');
const authMiddleware = require('../middleware/authMiddleware');
const errorHandler = require('../errors/errorHandler');
const itemsRouter = require('../router/itemsRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authMiddleware); 
app.use('/items', itemsRouter);
app.use(errorHandler); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
