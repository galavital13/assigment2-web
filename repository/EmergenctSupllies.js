const fs = require('fs');

class Item {
    constructor(item_name,unit_price ,quantity) {
        this.item_name = item_name;
        this.unit_price = unit_price;
        this.quantity = quantity;
    }
}

class items {
    constructor() {
        this.items = this.readItems();
    }

    readItems() {
        const data = fs.readFileSync('items.json', 'utf8');
        return JSON.parse(data).items || [];
    }

    writeItems(msg = "Items has been updated!") {
        fs.writeFile('items.json', JSON.stringify({ items: this.items }, null, 2), (err) => {
            if (err) {
                throw err;
            }
            console.log(msg);
        });
    }

    itemExists(item) {
        return this.items.find(it => it.item_name === item);
    }

    addItem(item) {
        if (item.item_name === '' || item.unit_price === '' || item.quantity === '' || item.unit_price < 0 || item.quantity < 0) {
            throw new Error('Invalid item');
        }

        if (this.itemExists(item.item_name)) {
            throw new Error('Item already exists');
        }

        this.items.push(item);
        this.writeItems("Item has been added to the list!");
    }

    deleteItem(item) {
        if (!this.itemExists(item)) {
            throw new Error('Item not found');
        }

        this.items = this.items.filter(it => it.item_name !== item);
        this.writeItems("Item has been deleted from the list!");
    }

    updateItem(item) {
        if (!this.itemExists(item.item_name)) {
            throw new Error('Item not found');
        }

        this.items.forEach(it => {
            if (it.item_name === item.item_name) {
                it.unit_price = item.unit_price;
                it.quantity = item.quantity;
            }
        });

        this.writeItems("Item has been updated in the list!");
    }

    getItems() {
        return { items: this.items };
    }

    getItem(item) {
        return this.items.find(it => it.item_name === item);
    }
}

module.exports = {
    Item,
    items
};
