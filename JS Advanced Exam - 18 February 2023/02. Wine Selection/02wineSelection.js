class WineSelection {
  constructor(space) {
    this.space = space;
    this.wines = [];
    this.bill = 0;
  }
  reserveABottle(wineName, wineType, price) {
    if (this.wines.length === this.space) {
      throw new Error('Not enough space in the cellar.');
    }

    const currWine = { wineName, wineType, price, paid: false };
    this.wines.push(currWine);

    return `You reserved a bottle of ${wineName} ${wineType} wine.`;
  }
  payWineBottle(wineName, price) {
    const currWine = this.wines.find((x) => x.wineName === wineName);

    if (currWine === undefined) {
      throw new Error(`${wineName} is not in the cellar.`);
    }

    if (currWine.paid === true) {
      throw new Error(`${wineName} has already been paid.`);
    }

    currWine.paid = true;
    this.bill += price;

    return `You bought a ${wineName} for a ${price}$.`;
  }
  openBottle(wineName) {
    const currWine = this.wines.find((x) => x.wineName === wineName);

    if (currWine === undefined) {
      throw new Error(`The wine, you're looking for, is not found.`);
    }

    if (currWine.paid === false) {
      throw new Error(`${wineName} need to be paid before open the bottle.`);
    }

    this.wines.filter((x) => x.wineName !== wineName);
    return `You drank a bottle of ${wineName}.`;
  }
  cellarRevision(wineType) {
    const res = [];
    if (wineType === undefined) {
      res.push(
        `You have space for ${this.space - this.wines.length} bottles more.`
      );
      res.push(`You paid ${this.bill}$ for the wine.`);

      this.wines
        .sort((a, b) => a.wineName.localeCompare(b.wineName))
        .forEach((x) => {
          x.paid === true
            ? res.push(`${x.wineName} > ${x.wineType} - Has Paid.`)
            : res.push(`${x.wineName} > ${x.wineType} - Not Paid.`);
        });
      return res.join('\n');
    }
    const curr = this.wines.find((x) => x.wineType === wineType);
    if (curr === undefined) {
      throw new Error(`There is no ${wineType} in the cellar.`);
    }
    if (curr.paid === true) {
      return `${curr.wineName} > ${curr.wineType} - Has Paid.`;
    } else {
      return `${curr.wineName} > ${curr.wineType} - Not Paid.`;
    }
  }
}

//Input 1
// const selection = new WineSelection(2)
// console.log(selection.reserveABottle('Sauvignon Blanc Marlborough', 'White', 50));
// console.log(selection.reserveABottle('Cabernet Sauvignon Napa Valley', 'Red', 120));
// console.log(selection.reserveABottle('Bodegas Godelia Mencía', 'Rose', 144));

//Input 2
// const selection = new WineSelection(2)
// selection.reserveABottle('Sauvignon Blanc Marlborough', 'White',50);
// console.log(selection.payWineBottle('Sauvignon Blanc Marlborough', 120));
// console.log(selection.payWineBottle('Bodegas Godelia Mencía', 144));

//Input 3
// const selection = new WineSelection(2)
// selection.reserveABottle('Sauvignon Blanc Marlborough', 'White', 50);
// selection.reserveABottle('Cabernet Sauvignon Napa Valley', 'Red', 120);
// selection.payWineBottle('Sauvignon Blanc Marlborough', 50);
// console.log(selection.openBottle('Sauvignon Blanc Marlborough'));
// console.log(selection.openBottle('Cabernet Sauvignon Napa Valley'));

//Input 4
// const selection = new WineSelection(2)
// console.log(selection.reserveABottle('Bodegas Godelia Mencía', 'Rose', 144));
// console.log(selection.cellarRevision('Rose'));

//Input 5
// const selection = new WineSelection(5);
// selection.reserveABottle('Bodegas Godelia Mencía', 'Rose', 144);
// selection.payWineBottle('Bodegas Godelia Mencía', 144);
// selection.reserveABottle('Sauvignon Blanc Marlborough', 'White', 50);
// selection.reserveABottle('Cabernet Sauvignon Napa Valley', 'Red', 120);
// console.log(selection.cellarRevision());
