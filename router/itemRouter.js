const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.getItems);
router.get('/:item_id', itemsController.getItemById);
router.post('/', itemsController.addItem);
router.put('/:item_id', itemsController.updateItem);
router.delete('/:item_id', itemsController.deleteItem);

module.exports = router;
