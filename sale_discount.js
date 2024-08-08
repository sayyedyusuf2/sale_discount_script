const readline = require('readline');

class Item {
  constructor(name, unitPrice, salePrice = null, saleQuantity = 0) {
    this.name = name;
    this.unitPrice = unitPrice;
    this.salePrice = salePrice;
    this.saleQuantity = saleQuantity;
  }

  calculatePrice(quantity) {
    if (this.salePrice && quantity >= this.saleQuantity) {
      const saleBundles = Math.floor(quantity / this.saleQuantity);
      const remainder = quantity % this.saleQuantity;
      return saleBundles * this.salePrice + remainder * this.unitPrice;
    }
    return quantity * this.unitPrice;
  }
}

class Cart {
  constructor() {
    this.items = {};
  }

  addItem(itemName) {
    if (!this.items[itemName]) {
      this.items[itemName] = 0;
    }
    this.items[itemName]++;
  }

  getTotalPrice(pricingTable) {
    let total = 0;
    for (const itemName in this.items) {
      const item = pricingTable.getItem(itemName);
      const quantity = this.items[itemName];
      total += item.calculatePrice(quantity);
    }
    return total;
  }
}

class PricingTable {
  constructor() {
    this.items = {};
  }

  addItem(item) {
    this.items[item.name.toLowerCase()] = item;
  }

  getItem(itemName) {
    return this.items[itemName.toLowerCase()];
  }
}

const pricingTable = new PricingTable();
pricingTable.addItem(new Item('Milk', 3.97, 5.00, 2));
pricingTable.addItem(new Item('Bread', 2.17, 6.00, 3));
pricingTable.addItem(new Item('Banana', 0.99));
pricingTable.addItem(new Item('Apple', 0.89));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}); 

rl.question('Please enter all the items purchased separated by a comma\n', (input) => {
  const items = input.split(',').map(item => item.trim());
  const cart = new Cart();
  items.forEach(item => cart.addItem(item));
  const total = cart.getTotalPrice(pricingTable);
  console.log(total)

  rl.close();
});