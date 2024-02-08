const itemRepository = require("../repository/itemRepository");
const { NotFoundError, ServerError } = require("../errors/errorHandler");

const getItems = async (req, res) => {
    try {
        const items = await itemRepository.getItems();
        res.status(200).json(items);
    } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };


const getItemByItemName = async (req, res) => {
    try {
        const item = await itemRepository.getItemByItemName(req.params.item_name);
        res.status(200).json(item);
    } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


const addItem = async (req, res) => {
    try {
        const item = await itemRepository.addItem(req.body);
        res.status(201).json(item);
    } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


const updateItem = async (req, res) => {
    try {
        const item = await itemRepository.updateItem(req.params.item_name , req.body);
        res.status(200).json(item);
    } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


const deleteItem = async (req, res) => {
    try {
        await itemRepository.deleteItem(req.params.item_name);
        res.status(200).json({ message: "Item has been deleted!" });
    } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


module.exports = {
    getItems,
    getItemByItemName,
    addItem,
    updateItem,
    deleteItem
};
