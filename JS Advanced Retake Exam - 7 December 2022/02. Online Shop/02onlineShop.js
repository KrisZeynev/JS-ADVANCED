class OnlineShop {
  constructor(warehouseSpace) {
    this.warehouseSpace = warehouseSpace;
    this.products = [];
    this.sales = [];
  }

  loadingStore(product, quantity, spaceRequired) {
    if (spaceRequired > this.warehouseSpace) {
      throw new Error('Not enough space in the warehouse.');
    }
    const currProduct = { product, quantity };
    this.products.push(currProduct);
    this.warehouseSpace -= spaceRequired;
    return `The ${product} has been successfully delivered in the warehouse.`;
  }

  quantityCheck(product, minimalQuantity) {
    const currProduct = this.products.find((x) => x.product === product);

    if (currProduct === undefined) {
      throw new Error(`There is no ${product} in the warehouse.`);
    }

    if (minimalQuantity <= 0) {
      throw new Error(`The quantity cannot be zero or negative.`);
    }
    if (minimalQuantity <= currProduct.quantity) {
      return `You have enough from product ${product}.`;
    }
    const difference = Math.abs(minimalQuantity - currProduct.quantity);
    currProduct.quantity = minimalQuantity;
    return `You added ${difference} more from the ${product} products.`;
  }
  sellProduct(product) {
    const currProduct = this.products.find((x) => x.product === product);

    if (currProduct === undefined) {
      throw new Error(`There is no ${product} in the warehouse.`);
    }

    currProduct.quantity -= 1;
    this.sales.push({ product: currProduct.product, quantity: 1 });
    this.products.filter((x) => x.product !== product);

    return `The ${product} has been successfully sold.`;
  }
  revision() {
    if (this.sales.length === 0) {
      throw new Error('There are no sales today!');
    }
    const output = [`You sold ${this.sales.length} products today!`];
    output.push`Products in the warehouse:`;

    this.products.forEach((x) => {
      output.push(`${x.product}-${x.quantity} more left`);
    });
    return output.join('\n');
  }
}

// Input 1

// const myOnlineShop = new OnlineShop(500);
// console.log(myOnlineShop.loadingStore('headphones', 10, 200));
// console.log(myOnlineShop.loadingStore('laptop', 5, 200));
// console.log(myOnlineShop.loadingStore('TV', 40, 500));

// Input 2
// const myOnlineShop = new OnlineShop(500);
// console.log(myOnlineShop.loadingStore('headphones', 10, 200));
// console.log(myOnlineShop.loadingStore('laptop', 5, 200));
// console.log(myOnlineShop.quantityCheck('headphones', 10));
// console.log(myOnlineShop.quantityCheck('laptop', 10));
// console.log(myOnlineShop.quantityCheck('TV', 40));

// Input 3
// const myOnlineShop = new OnlineShop(500);
// console.log(myOnlineShop.loadingStore('headphones', 10, 200));
// console.log(myOnlineShop.loadingStore('laptop', 5, 200));
// console.log(myOnlineShop.quantityCheck('headphones', 10));
// console.log(myOnlineShop.quantityCheck('laptop', 10));
// console.log(myOnlineShop.sellProduct('headphones'));
// console.log(myOnlineShop.sellProduct('laptop'));
// console.log(myOnlineShop.sellProduct('keyboard'));

// Input 4
// const myOnlineShop = new OnlineShop(500);
// console.log(myOnlineShop.loadingStore('headphones', 10, 200));
// console.log(myOnlineShop.loadingStore('laptop', 5, 200));
// console.log(myOnlineShop.quantityCheck('headphones', 10));
// console.log(myOnlineShop.quantityCheck('laptop', 10));
// console.log(myOnlineShop.sellProduct('headphones'));
// console.log(myOnlineShop.sellProduct('laptop'));
// console.log(myOnlineShop.revision());
