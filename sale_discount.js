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

  getItems() {
    return this.items;
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

class ReceiptPrinter {
  static printReceipt(cart, pricingTable) {
    let total = 0;
    let totalSaved = 0;
    console.log('Item     Quantity      Price');
    console.log('--------------------------------------');
    const cartItems = cart.getItems();
    for (const itemName in cartItems) {
      const item = pricingTable.getItem(itemName);
      const quantity = cartItems[itemName];
      const price = item.calculatePrice(quantity);
      const unitPriceTotal = item.unitPrice * quantity;
      const saved = unitPriceTotal - price;
      console.log(`${itemName}      ${quantity}            $${price.toFixed(2)}`);
      total += price;
      totalSaved += saved;
    }
    console.log('--------------------------------------');
    console.log(`Total price : $${total.toFixed(2)}`);
    console.log(`You saved $${totalSaved.toFixed(2)} today.`);
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
  ReceiptPrinter.printReceipt(cart, pricingTable);
  rl.close();
});