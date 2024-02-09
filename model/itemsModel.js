const mongoose = require("mongoose");
const schemaItems = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
    unique: true,
  },
  unit_price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const itemsModel = mongoose.model("itemsModel", schemaItems);
module.exports = itemsModel;
