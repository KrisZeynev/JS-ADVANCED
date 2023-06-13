const { expect } = require('chai');
const { describe, it } = require('mocha');

const bookSelection = {
  isGenreSuitable(genre, age) {
    if (age <= 12 && (genre === 'Thriller' || genre === 'Horror')) {
      return `Books with ${genre} genre are not suitable for kids at ${age} age`;
    } else {
      return `Those books are suitable`;
    }
  },
  isItAffordable(price, budget) {
    if (typeof price !== 'number' || typeof budget !== 'number') {
      throw new Error('Invalid input');
    }

    let result = budget - price;

    if (result < 0) {
      return "You don't have enough money";
    } else {
      return `Book bought. You have ${result}$ left`;
    }
  },
  suitableTitles(array, wantedGenre) {
    let resultArr = [];

    if (!Array.isArray(array) || typeof wantedGenre !== 'string') {
      throw new Error('Invalid input');
    }
    array.map((obj) => {
      if (obj.genre === wantedGenre) {
        resultArr.push(obj.title);
      }
    });
    return resultArr;
  },
};

describe('Book selection', function () {
  describe('isGenreSuitable', () => {
    it('Testing for all cases (isGenreSuitable or not): for genre and years', () => {
      expect(bookSelection.isGenreSuitable('Thriller', 12)).to.be.equal(
        `Books with Thriller genre are not suitable for kids at 12 age`
      );
      expect(bookSelection.isGenreSuitable('Horror', 11)).to.be.equal(
        `Books with Horror genre are not suitable for kids at 11 age`
      );
      expect(bookSelection.isGenreSuitable('Thriller', 20)).to.be.equal(
        `Those books are suitable`
      );
      expect(bookSelection.isGenreSuitable('Horror', 20)).to.be.equal(
        `Those books are suitable`
      );
    });
  });
  describe('isItAffordable', () => {
    it('When result is less than 0', () => {
      expect(bookSelection.isItAffordable(20, 10)).to.be.equal(
        "You don't have enough money"
      );
    });
    it('When result is more than 0', () => {
      expect(bookSelection.isItAffordable(10, 20)).to.be.equal(
        'Book bought. You have 10$ left'
      );
    });
    it('validate data for first arg', () => {
      expect(() => bookSelection.isItAffordable('deset', 10)).to.throw(
        Error,
        'Invalid input'
      );
    });
    it('validate data for sec arg', () => {
      expect(() => bookSelection.isItAffordable(10, 'deset')).to.throw(
        Error,
        'Invalid input'
      );
    });
  });
  describe('suitableTitles', () => {
    it('Good case', () => {
      expect(
        bookSelection.suitableTitles(
          [
            { title: 'The Da Vinci Code', genre: 'Thriller' },
            { title: 'Other book', genre: 'Thriller' },
            { title: 'PPP', genre: 'PPP' },
          ],
          'Thriller'
        )
      ).to.be.deep.equal(['The Da Vinci Code', 'Other book']);
    });
    it('Bad cases', () => {
      expect(() => bookSelection.suitableTitles('asd', 'SD')).to.throw(
        Error,
        'Invalid input'
      );
      expect(() => bookSelection.suitableTitles(['SS'], ['SS'])).to.throw(
        Error,
        'Invalid input'
      );
    });
  });
});
