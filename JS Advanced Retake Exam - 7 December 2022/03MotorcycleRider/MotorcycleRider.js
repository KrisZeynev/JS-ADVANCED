const { expect } = require('chai');
const { describe, it } = require('mocha');
const motorcycleRider = {
  licenseRestriction(category) {
    if (category === 'AM') {
      return 'Mopeds with a maximum design speed of 45 km. per hour, engine volume is no more than 50 cubic centimeters, and the minimum age is 16.';
    } else if (category === 'A1') {
      return 'Motorcycles with engine volume is no more than 125 cubic centimeters, maximum power of 11KW. and the minimum age is 16.';
    } else if (category === 'A2') {
      return 'Motorcycles with maximum power of 35KW. and the minimum age is 18.';
    } else if (category === 'A') {
      return 'No motorcycle restrictions, and the minimum age is 24.';
    } else {
      throw new Error('Invalid Information!');
    }
  },
  motorcycleShowroom(engineVolume, maximumEngineVolume) {
    if (
      !Array.isArray(engineVolume) ||
      typeof maximumEngineVolume !== 'number' ||
      engineVolume.length < 1 ||
      maximumEngineVolume < 50
    ) {
      throw new Error('Invalid Information!');
    }
    let availableBikes = [];
    engineVolume.forEach((engine) => {
      if (engine <= maximumEngineVolume && engine >= 50) {
        availableBikes.push(engine);
      }
    });
    return `There are ${availableBikes.length} available motorcycles matching your criteria!`;
  },
  otherSpendings(equipment, consumables, discount) {
    if (
      !Array.isArray(equipment) ||
      !Array.isArray(consumables) ||
      typeof discount !== 'boolean'
    ) {
      throw new Error('Invalid Information!');
    }
    let totalPrice = 0;

    equipment.forEach((element) => {
      if (element === 'helmet') {
        totalPrice += 200;
      } else if (element === 'jacked') {
        totalPrice += 300;
      }
    });

    consumables.forEach((element) => {
      if (element === 'engine oil') {
        totalPrice += 70;
      } else if (element === 'oil filter') {
        totalPrice += 30;
      }
    });
    if (discount) {
      totalPrice = totalPrice * 0.9;
      return `You spend $${totalPrice.toFixed(
        2
      )} for equipment and consumables with 10% discount!`;
    } else {
      return `You spend $${totalPrice.toFixed(
        2
      )} for equipment and consumables!`;
    }
  },
};

describe('Motorcicle Rider', () => {
  describe('licenseRestriction', () => {
    it('Validate the input', () => {
      expect(motorcycleRider.licenseRestriction('AM')).to.be.equal(
        'Mopeds with a maximum design speed of 45 km. per hour, engine volume is no more than 50 cubic centimeters, and the minimum age is 16.'
      );
      expect(motorcycleRider.licenseRestriction('A1')).to.be.equal(
        'Motorcycles with engine volume is no more than 125 cubic centimeters, maximum power of 11KW. and the minimum age is 16.'
      );
      expect(motorcycleRider.licenseRestriction('A2')).to.be.equal(
        'Motorcycles with maximum power of 35KW. and the minimum age is 18.'
      );
      expect(motorcycleRider.licenseRestriction('A')).to.be.equal(
        'No motorcycle restrictions, and the minimum age is 24.'
      );
      expect(() => motorcycleRider.licenseRestriction('asdasd')).to.throw(
        Error,
        'Invalid Information!'
      );
    });
  });
  describe('motorcycleShowroom', () => {
    it('Validate the input', () => {
      expect(() => motorcycleRider.motorcycleShowroom('arr', 10)).to.throw(
        Error,
        'Invalid Information!'
      );
      expect(() => motorcycleRider.motorcycleShowroom([], 10)).to.throw(
        Error,
        'Invalid Information!'
      );
      expect(() => motorcycleRider.motorcycleShowroom([1, 2], '10')).to.throw(
        Error,
        'Invalid Information!'
      );
      expect(() => motorcycleRider.motorcycleShowroom([1, 2], 49)).to.throw(
        Error,
        'Invalid Information!'
      );
    });
    it('Result check', () => {
      let engineVolume = [100, 110, 130, 200, 300];
      let maximumEngineVolume = 200;
      expect(
        motorcycleRider.motorcycleShowroom(engineVolume, maximumEngineVolume)
      ).to.be.equal(
        'There are 4 available motorcycles matching your criteria!'
      );
    });
  });
  describe('otherSpendings', () => {
    it('Validate the input', () => {
      expect(() => motorcycleRider.otherSpendings('arr', [1], true)).to.throw(
        Error,
        'Invalid Information!'
      );
      expect(() => motorcycleRider.otherSpendings([1], 'arr', true)).to.throw(
        Error,
        'Invalid Information!'
      );
      expect(() => motorcycleRider.otherSpendings([1], [1], 'bool')).to.throw(
        Error,
        'Invalid Information!'
      );
    });
    it('Discount === True', () => {
      expect(
        motorcycleRider.otherSpendings(
          ['helmet', 'helmet', 'jacked'], //200 + 200 + 300
          ['engine oil', 'oil filter', 'oil filter'], //70 + 30 + 30
          true
        )
      ).to.be.equal(
        `You spend $747.00 for equipment and consumables with 10% discount!`
      );
    });
    it('Discount === False', () => {
      expect(
        motorcycleRider.otherSpendings(
          ['helmet', 'helmet', 'jacked'], //200 + 200 + 300
          ['engine oil', 'oil filter', 'oil filter'], //70 + 30 + 30
          false
        )
      ).to.be.equal(`You spend $830.00 for equipment and consumables!`);
    });
  });
});
