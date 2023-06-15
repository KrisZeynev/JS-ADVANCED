class RefurbishedSmartphones {
  constructor(retailer) {
    this.retailer = retailer;
    this.availableSmartphones = [];
    this.soldSmartphones = [];
    this.revenue = 0;
  }
  addSmartphone(model, storage, price, condition) {
    if (model === '' || storage < 0 || price < 0 || condition === '') {
      throw new Error('Invalid smartphone!');
    }
    const smartphone = { model, storage, price, condition };
    this.availableSmartphones.push(smartphone);
    return `New smartphone added: ${model} / ${storage} GB / ${condition} condition - ${price.toFixed(
      2
    )}$`;
  }
  sellSmartphone(model, desiredStorage) {
    const currSmartphone = this.availableSmartphones.find(
      (phone) => phone.model === model
    );

    let soldPrice = 0;

    if (!currSmartphone) {
      throw new Error(`${model} was not found!`);
    }

    if (currSmartphone.storage >= desiredStorage) {
      soldPrice = currSmartphone.price;
    } else if (Math.abs(currSmartphone.storage - desiredStorage) <= 128) {
      soldPrice = currSmartphone.price - currSmartphone.price * 0.1;
    } else {
      soldPrice = currSmartphone.price - currSmartphone.price * 0.2;
    }

    this.revenue += soldPrice;
    this.availableSmartphones.filter((x) => x.model !== model);

    const addNewSmartphone = {
      model: currSmartphone.model,
      storage: currSmartphone.storage,
      soldPrice,
    };

    this.soldSmartphones.push(addNewSmartphone);

    return `${model} was sold for ${soldPrice.toFixed(2)}$`;
  }
  upgradePhones() {
    if (this.availableSmartphones.length === 0) {
      throw new Error('There are no available smartphones!');
    }

    this.availableSmartphones = this.availableSmartphones.map((phone) => {
      return {
        ...phone,
        storage: phone.storage * 2,
        price: phone.price.toFixed(2),
      };
    });

    const result = [`Upgraded Smartphones:`];
    this.availableSmartphones.forEach((x) => {
      result.push(
        `${x.model} / ${x.storage} GB / ${x.condition} condition / ${x.price}$`
      );
    });
    return result.join('\n');
  }
  salesJournal(criteria) {
    if (criteria !== 'storage' && criteria !== 'model') {
      throw new Error('Invalid criteria!');
    }

    criteria === 'storage'
      ? this.soldSmartphones.sort((a, b) => b.storage - a.storage)
      : this.soldSmartphones.sort((a, b) => a.model.localeCompare(b.model));

    const output = [];
    output.push(
      `${this.retailer} has a total income of ${this.revenue.toFixed(2)}$`
    );

    output.push(`${this.soldSmartphones.length} smartphones sold:`);
    this.soldSmartphones.forEach((x) => {
      output.push(`${x.model} / ${x.storage} GB / ${x.soldPrice.toFixed(2)}$`);
    });

    return output.join('\n');
  }
}
