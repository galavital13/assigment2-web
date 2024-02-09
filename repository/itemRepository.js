const itemsModel = require("../model/itemsModel");

const getItems = async () => {
  try {
    const items = await itemsModel.find();
    return items;
  } catch (error) {
    return { message: error.message };
  }
};
const getItemByItemName = async (name) => {
  try {
    const item = await itemsModel.findOne({ item_name: name });
    return item;
  } catch (error) {
    return { message: error.message };
  }
};
const addItem = async (dataItem) => {
  try {
    const item = await itemsModel.create(dataItem);
    return item;
  } catch (error) {
    return { message: error.message };
  }
};

const updateItem = async (ItemName, dataItem) => {
  try {
    const item = await itemsModel.findOneAndUpdate(
      { item_name: ItemName },
      dataItem,
      { new: true, runValidators: true },
    );
    return item;
  } catch (error) {
    return { message: error.message };
  }
};

const deleteItem = async (name) => {
  try {
    await itemsModel.findOneAndDelete({ item_name: name });
    return { message: "Item has been deleted!" };
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  getItems,
  getItemByItemName,
  addItem,
  updateItem,
  deleteItem,
};
