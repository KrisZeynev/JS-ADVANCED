const { expect } = require('chai');
const { describe, it } = require('mocha');

const carService = {
  isItExpensive(issue) {
    if (issue === 'Engine' || issue === 'Transmission') {
      return `The issue with the car is more severe and it will cost more money`;
    } else {
      return `The overall price will be a bit cheaper`;
    }
  },
  discount(numberOfParts, totalPrice) {
    if (typeof numberOfParts !== 'number' || typeof totalPrice !== 'number') {
      throw new Error('Invalid input');
    }

    let discountPercentage = 0;

    if (numberOfParts > 2 && numberOfParts <= 7) {
      discountPercentage = 15;
    } else if (numberOfParts > 7) {
      discountPercentage = 30;
    }

    let result = (discountPercentage / 100) * totalPrice;

    if (numberOfParts <= 2) {
      return 'You cannot apply a discount';
    } else {
      return `Discount applied! You saved ${result}$`;
    }
  },
  partsToBuy(partsCatalog, neededParts) {
    let totalSum = 0;

    if (!Array.isArray(partsCatalog) || !Array.isArray(neededParts)) {
      throw new Error('Invalid input');
    }
    neededParts.forEach((neededPart) => {
      partsCatalog.map((obj) => {
        if (obj.part === neededPart) {
          totalSum += obj.price;
        }
      });
    });

    return totalSum;
  },
};

describe('Car Service', () => {
  describe('isItExpensive', () => {
    it('If issue === "Engine" || issue === "Transmission"', () => {
      expect(carService.isItExpensive('Engine')).to.be.equal(
        'The issue with the car is more severe and it will cost more money'
      );
      expect(carService.isItExpensive('Transmission')).to.be.equal(
        'The issue with the car is more severe and it will cost more money'
      );
      expect(carService.isItExpensive('Sth')).to.be.equal(
        'The overall price will be a bit cheaper'
      );
    });
  });
  describe('discount', () => {
    describe('Validate input', () => {
      it('Check for typeof numberOfParts !== "number"', () => {
        expect(() => carService.discount('10', 10)).to.throw(
          Error,
          'Invalid input'
        );
      });
      it('Check for typeof totalPrice !== "number"', () => {
        expect(() => carService.discount(10, '10')).to.throw(
          Error,
          'Invalid input'
        );
      });
    });
    describe('Tests for Parts', () => {
      it('numberOfParts > 2 && numberOfParts <= 7', () => {
        const numOfParts1 = 3;
        const totalPrice1 = 30;
        const res = (15 / 100) * totalPrice1;
        const numOfParts2 = 8;
        const totalPrice2 = 30;
        const res2 = (30 / 100) * totalPrice2;
        expect(carService.discount(numOfParts1, totalPrice1)).to.be.equal(
          `Discount applied! You saved ${res}$`
        );
        expect(carService.discount(numOfParts2, totalPrice2)).to.be.equal(
          `Discount applied! You saved ${res2}$`
        );
      });
      it('numberOfParts <= 2', () => {
        expect(carService.discount(2, 7)).to.be.equal(
          'You cannot apply a discount'
        );
      });
    });
  });
  describe('partsToBuy', () => {
    it('Validate data', () => {
      expect(() => carService.partsToBuy('1', [1, 2, 3])).to.throw(
        Error,
        'Invalid input'
      );

      expect(() => carService.partsToBuy([1, 2, 3], '1')).to.throw(
        Error,
        'Invalid input'
      );
    });
    it('Main tests', () => {
      const partsCatalog = [
        { part: 'blowoff valve', price: 145 },
        { part: 'coil springs', price: 230 },
      ];
      const neededParts = ['blowoff valve', 'injectors'];

      const partsCatalog1 = [
        { part: 'blowoff valve', price: 145 },
        { part: 'coil springs', price: 230 },
        { part: 'sth', price: 230 },
      ];
      const neededParts1 = ['blowoff valve', 'injectors', 'sth'];

      expect(carService.partsToBuy([], neededParts)).to.be.equal(0);
      expect(carService.partsToBuy(partsCatalog, neededParts)).to.be.equal(145);
      expect(carService.partsToBuy(partsCatalog1, neededParts1)).to.be.equal(
        375
      );
    });
  });
});
