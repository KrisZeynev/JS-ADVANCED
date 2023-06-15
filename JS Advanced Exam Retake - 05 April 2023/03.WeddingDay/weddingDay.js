const { expect } = require('chai');
const { describe, it } = require('mocha');

const weddingDay = {
  pickVenue(capacity, pricePerGuest, location) {
    if (
      typeof capacity !== 'number' ||
      typeof pricePerGuest !== 'number' ||
      typeof location !== 'string' ||
      location === ''
    ) {
      throw new Error('Invalid Information!');
    }
    if (location == 'Varna') {
      if (capacity >= 150 && pricePerGuest <= 120) {
        return `This venue meets the requirements, with capacity of ${capacity} guests and ${pricePerGuest}$ cover.`;
      } else {
        return `This venue does not meet your requirements!`;
      }
    } else {
      throw new Error(`The location of this venue is not in the correct area!`);
    }
  },

  otherSpendings(weddingDecoration, photography, discount) {
    if (
      !Array.isArray(weddingDecoration) ||
      !Array.isArray(photography) ||
      typeof discount !== 'boolean'
    ) {
      throw new Error('Invalid Information!');
    }
    let totalPrice = 0;

    weddingDecoration.forEach((decoration) => {
      if (decoration === 'flowers') {
        totalPrice += 500;
      } else if (decoration === 'Fabric drapes and curtains') {
        totalPrice += 400;
      }
    });

    photography.forEach((service) => {
      if (service === 'pictures') {
        totalPrice += 700;
      } else if (service === 'video') {
        totalPrice += 1300;
      }
    });
    if (discount) {
      totalPrice = totalPrice * 0.85;
      return `You spend ${totalPrice}$ for wedding decoration and photography with 15% discount!`;
    } else {
      return `You spend ${totalPrice}$ for wedding decoration and photography!`;
    }
  },
  tableDistribution(guests, tables) {
    if (
      typeof guests !== 'number' ||
      guests <= 0 ||
      typeof tables !== 'number' ||
      tables <= 0
    ) {
      throw new Error('Invalid Information!');
    }
    let peopleOnTable = Math.round(guests / tables);

    if (peopleOnTable < 6) {
      return `There is only ${peopleOnTable} people on every table, you can join some tables.`;
    } else {
      return `You have ${tables} tables with ${peopleOnTable} guests on table.`;
    }
  },
};

describe('Wedding day tests', () => {
  describe('pickVenue', () => {
    it('Validate the input', () => {
      expect(() => weddingDay.pickVenue('s', 2, 'Sofia')).to.throw(
        Error,
        'Invalid Information!'
      );
      expect(() => weddingDay.pickVenue(2, 's', 'Sofia')).to.throw(
        Error,
        'Invalid Information!'
      );
      expect(() => weddingDay.pickVenue(2, 2, '')).to.throw(
        Error,
        'Invalid Information!'
      );
    });
    it('Test for location => Varna', () => {
      it('Location === Varna => if block', () => {
        expect(weddingDay.pickVenue(150, 120, 'Varna')).to.be.equal(
          'This venue meets the requirements, with capacity of 150 guests and 120$ cover.'
        );
      });
      it('Location === Varna => else block', () => {
        expect(weddingDay.pickVenue(100, 200, 'Varna')).to.be.equal(
          'This venue does not meet your requirements!'
        );
      });
    });
    it('Test for location !== Varna', () => {
      it('Throw error', () => {
        expect(() => weddingDay.pickVenue(150, 120, 'Sofia')).to.throw(
          Error,
          'The location of this venue is not in the correct area!'
        );
      });
    });
  });
  describe('otherSpendings', () => {
    describe('Validate the input', () => {
      it('Incorrect first arg', () => {
        expect(() => weddingDay.pickVenue('array', [1, 2], false)).to.throw(
          Error,
          'Invalid Information!'
        );
      });
      it('Incorrect second arg', () => {
        expect(() =>
          weddingDay.otherSpendings([1, 2], 'array', false)
        ).to.throw(Error, 'Invalid Information!');
      });
      it('Incorrect second arg', () => {
        expect(() =>
          weddingDay.otherSpendings([1, 2], [1, 2], 'false')
        ).to.throw(Error, 'Invalid Information!');
      });
    });
    describe('Discount === true', () => {
      const wedArr1 = ['flowers', 'flowers'];
      const photoArr1 = ['pictures', 'pictures'];
      const price1 = wedArr1.length * 500 + photoArr1.length * 700;
      const res1 = price1 - price1 * 0.15;

      const wedArr2 = ['flowers', 'flowers', 'Fabric drapes and curtains'];
      const photoArr2 = ['pictures', 'pictures', 'video'];
      const price2 = 1400 + 2700;
      const res2 = price2 - price2 * 0.15;
      it('Apply 15% discount', () => {
        expect(weddingDay.otherSpendings(wedArr1, photoArr1, true)).to.be.equal(
          `You spend ${res1}$ for wedding decoration and photography with 15% discount!`
        );
        expect(weddingDay.otherSpendings(wedArr2, photoArr2, true)).to.be.equal(
          `You spend ${res2}$ for wedding decoration and photography with 15% discount!`
        );
      });
    });
    describe('Discount !== true', () => {
      const wedArr = ['flowers', 'flowers'];
      const photoArr = ['pictures', 'pictures'];
      const price = wedArr.length * 500 + photoArr.length * 700;
      it('dicount === false', () => {
        expect(weddingDay.otherSpendings(wedArr, photoArr, false)).to.be.equal(
          `You spend ${price}$ for wedding decoration and photography!`
        );
      });
    });
  });
  describe('tableDistribution ', () => {
    describe('Validate the input', () => {
      it('Validate guests and tables', () => {
        expect(() => weddingDay.tableDistribution('10', 10)).to.throw(
          Error,
          'Invalid Information!'
        );
        expect(() => weddingDay.tableDistribution(0, 10)).to.throw(
          Error,
          'Invalid Information!'
        );
        expect(() => weddingDay.tableDistribution(10, '10')).to.throw(
          Error,
          'Invalid Information!'
        );
        expect(() => weddingDay.tableDistribution(10, 0)).to.throw(
          Error,
          'Invalid Information!'
        );
      });
    });
    describe('People on table < 6', () => {
      it('People < 6', () => {
        expect(weddingDay.tableDistribution(6, 4)).to.be.equal(
          `There is only 2 people on every table, you can join some tables.`
        );
      });
      it('People === 6', () => {
        expect(weddingDay.tableDistribution(12, 2)).to.be.equal(
          `You have 2 tables with 6 guests on table.`
        );
      });
      it('People > 6', () => {
        expect(weddingDay.tableDistribution(30, 4)).to.be.equal(
          `You have 4 tables with 8 guests on table.`
        );
      });
    });
  });
});
