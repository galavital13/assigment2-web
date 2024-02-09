const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.get("/", itemsController.getItems);
router.get("/:item_name", itemsController.getItemByItemName);
router.post("/", itemsController.addItem);
router.put("/:item_name", itemsController.updateItem);
router.delete("/:item_name", itemsController.deleteItem);

module.exports = router;
