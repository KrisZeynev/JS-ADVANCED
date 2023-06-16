const { expect } = require('chai');
const { describe, it } = require('mocha');
const findNewApartment = {
  isGoodLocation(city, nearPublicTransportation) {
    if (
      typeof city !== 'string' ||
      typeof nearPublicTransportation !== 'boolean'
    ) {
      throw new Error('Invalid input!');
    }
    if (city !== 'Sofia' && city !== 'Plovdiv' && city !== 'Varna') {
      return 'This location is not suitable for you.';
    } else {
      if (nearPublicTransportation == true) {
        return 'You can go on home tour!';
      } else {
        return 'There is no public transport in area.';
      }
    }
  },
  isLargeEnough(apartments, minimalSquareMeters) {
    let resultArr = [];
    if (
      !Array.isArray(apartments) ||
      typeof minimalSquareMeters !== 'number' ||
      apartments.length == 0
    ) {
      throw new Error('Invalid input!');
    }
    apartments.map((apartment) => {
      if (apartment >= minimalSquareMeters) {
        resultArr.push(apartment);
      }
    });
    return resultArr.join(', ');
  },
  isItAffordable(price, budget) {
    if (
      typeof price !== 'number' ||
      typeof budget !== 'number' ||
      price <= 0 ||
      budget <= 0
    ) {
      throw new Error('Invalid input!');
    }
    let result = budget - price;
    if (result < 0) {
      return "You don't have enough money for this house!";
    } else {
      return 'You can afford this home!';
    }
  },
};

describe('Find Apartment', () => {
  describe('isGoodLocation', () => {
    it('Validate the input', () => {
      expect(() => findNewApartment.isGoodLocation(1, true)).to.throw(
        Error,
        'Invalid input!'
      );
      expect(() => findNewApartment.isGoodLocation('string', 1)).to.throw(
        Error,
        'Invalid input!'
      );
    });
    it('city !== Sofia || Plovdiv || Varna', () => {
      expect(findNewApartment.isGoodLocation('Ablanitsa', true)).to.be.equal(
        'This location is not suitable for you.'
      );
    });
    it('city === Sofia || Plovdiv || Varna && nearPublicTransportation === true', () => {
      expect(findNewApartment.isGoodLocation('Sofia', true)).to.be.equal(
        'You can go on home tour!'
      );
    });
    it('city === Sofia || Plovdiv || Varna && nearPublicTransportation === false', () => {
      expect(findNewApartment.isGoodLocation('Sofia', false)).to.be.equal(
        'There is no public transport in area.'
      );
    });
  });
  describe('isLargeEnough', () => {
    it('Validate the input', () => {
      expect(() => findNewApartment.isLargeEnough('12', 12)).to.throw(
        Error,
        'Invalid input!'
      );
      expect(() => findNewApartment.isLargeEnough([1, 2, 3], '12')).to.throw(
        Error,
        'Invalid input!'
      );
      expect(() => findNewApartment.isLargeEnough([], 12)).to.throw(
        Error,
        'Invalid input!'
      );
    });
    it('Result arr', () => {
      const arr = [40, 50, 60];
      const min = 50;
      const arr1 = [10, 20, 30, 40, 50, 60];
      const min1 = 20;
      expect(findNewApartment.isLargeEnough(arr, min)).to.be.equal('50, 60');
      expect(findNewApartment.isLargeEnough(arr1, min1)).to.be.equal(
        '20, 30, 40, 50, 60'
      );
    });
  });
  describe('isItAffordable', () => {
    it('Validate the input', () => {
      expect(() => findNewApartment.isItAffordable('price', 20)).to.throw(
        Error,
        'Invalid input!'
      );
      expect(() => findNewApartment.isItAffordable(-20, 20)).to.throw(
        Error,
        'Invalid input!'
      );
      expect(() => findNewApartment.isItAffordable(20, 'budget')).to.throw(
        Error,
        'Invalid input!'
      );
      expect(() => findNewApartment.isItAffordable(20, -20)).to.throw(
        Error,
        'Invalid input!'
      );
    });
    it('Calc the result => res < 0', () => {
      // price, budget
      expect(findNewApartment.isItAffordable(30, 20)).to.be.equal(
        "You don't have enough money for this house!"
      );
    });
    it('Calc the result => res > 0', () => {
      // price, budget
      expect(findNewApartment.isItAffordable(30, 50)).to.be.equal(
        'You can afford this home!'
      );
    });
    it('Calc the result => res === 0', () => {
      // price, budget
      expect(findNewApartment.isItAffordable(60, 60)).to.be.equal(
        'You can afford this home!'
      );
    });
  });
});
