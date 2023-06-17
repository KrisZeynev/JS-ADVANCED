const { it, describe } = require('mocha');
const { expect } = require('chai');

const lottery = {
	buyLotteryTicket(ticketPrice, ticketCount, buy) {
		if (buy === false) {
			throw new Error('Unable to buy lottery ticket!');
		} else {
			if (
				ticketPrice <= 0 ||
				ticketCount < 1 ||
				typeof ticketPrice !== 'number' ||
				typeof ticketCount !== 'number' ||
				typeof buy !== 'boolean'
			) {
				throw new Error('Invalid input!');
			} else {
				let totalPrice = ticketPrice * ticketCount;
				return `You bought ${ticketCount} tickets for ${totalPrice}$.`;
			}
		}
	},
	checkTicket(ticketNumbers, luckyNumbers) {
		if (
			!Array.isArray(ticketNumbers) ||
			!Array.isArray(luckyNumbers) ||
			ticketNumbers.length !== 6 ||
			luckyNumbers.length !== 6
		) {
			throw new Error('Invalid input!');
		}

		const uniqueTicketNumbers = ticketNumbers.filter(
			(number, index, array) => array.indexOf(number) === index
		);
		let winningNumbers = 0;

		for (const number of uniqueTicketNumbers) {
			if (luckyNumbers.includes(number)) {
				winningNumbers++;
			}
		}

		if (winningNumbers >= 3 && winningNumbers < 6) {
			return 'Congratulations you win, check your reward!';
		} else if (winningNumbers === 6) {
			return 'You win the JACKPOT!!!';
		}
	},
	secondChance(ticketID, secondChanceWinningIDs) {
		if (
			typeof ticketID !== 'number' ||
			!Array.isArray(secondChanceWinningIDs)
		) {
			throw new Error('Invalid input!');
		}
		if (secondChanceWinningIDs.includes(ticketID)) {
			return 'You win our second chance prize!';
		} else {
			return "Sorry, your ticket didn't win!";
		}
	},
};

module.exports = lottery;

console.log(lottery.checkTicket([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]));


describe('Lottery unit testing', () => {
  describe('buyLotteryTicket()', () => {
    it('Validate data - Unable to buy', () => {
      let ticketPrice = 30;
      let ticketCount = 3;
      let buy = false;
      expect(() => {
        lottery.buyLotteryTicket(ticketPrice, ticketCount, buy);
      }).to.throw(Error, 'Unable to buy lottery ticket!');
      //
      let ticketPrice1 = 0;
      let ticketCount1 = 3;
      let buy1 = true;
      //
      expect(() => {
        lottery.buyLotteryTicket(ticketPrice1, ticketCount1, buy1);
      }).to.throw(Error, 'Invalid input!');
      let ticketPrice2 = 20;
      let ticketCount2 = 0;
      let buy2 = true;
      //
      expect(() => {
        lottery.buyLotteryTicket(ticketPrice2, ticketCount2, buy2);
      }).to.throw(Error, 'Invalid input!');
      //
      let ticketPrice3 = '20';
      let ticketCount3 = 5;
      let buy3 = true;
      expect(() => {
        lottery.buyLotteryTicket(ticketPrice3, ticketCount3, buy3);
      }).to.throw(Error, 'Invalid input!');
      //
      let ticketPrice4 = 20;
      let ticketCount4 = '5';
      let buy4 = true;
      expect(() => {
        lottery.buyLotteryTicket(ticketPrice4, ticketCount4, buy4);
      }).to.throw(Error, 'Invalid input!');
      //
      let ticketPrice5 = 20;
      let ticketCount5 = 5;
      let buy5 = 'true';
      expect(() => {
        lottery.buyLotteryTicket(ticketPrice5, ticketCount5, buy5);
      }).to.throw(Error, 'Invalid input!');
      //
    });
    it('Valid data', () => {
      let ticketPrice = 10;
      let ticketCount = 6;
      let buy = true;
      expect(
        lottery.buyLotteryTicket(ticketPrice, ticketCount, buy)
      ).to.be.equal('You bought 6 tickets for 60$.');
    });
  });
  describe('checkTicket()', () => {
    it('Invalid data - first case', () => {
      let ticketNumbers = 'sth';
      let luckyNumbers = [1, 5, 6, 7];
      expect(() => {
        lottery.checkTicket(ticketNumbers, luckyNumbers);
      }).to.throw(Error, 'Invalid input!');

      //

      let ticketNumbers1 = [1, 5, 6, 7];
      let luckyNumbers1 = 'sth';

      expect(() => {
        lottery.checkTicket(ticketNumbers1, luckyNumbers1);
      }).to.throw(Error, 'Invalid input!');
    });

    it('Invalid data - first case - ticket', () => {
      let ticketNumbers = [3, 6, 2, 4, 8, 4];
      let luckyNumbers = [4, 2, 6, 5];

      expect(() => {
        lottery.checkTicket(ticketNumbers, luckyNumbers);
      }).to.throw(Error, 'Invalid input!');

      //

      let ticketNumbers1 = [4, 2, 6, 5];
      let luckyNumbers1 = [3, 6, 2, 4, 8, 4];

      expect(() => {
        lottery.checkTicket(ticketNumbers1, luckyNumbers1);
      }).to.throw(Error, 'Invalid input!');
    });

    it('Valid data - case for win', () => {
      let ticketNumbers = [1, 2, 3, 4, 5, 6];
      let luckyNumbers = [1, 2, 3, 7, 8, 9];

      expect(lottery.checkTicket(ticketNumbers, luckyNumbers)).to.be.equal(
        'Congratulations you win, check your reward!'
      );
    });
    it('Valid data - case for JACKPOT', () => {
      let ticketNumbers = [1, 2, 3, 4, 5, 6];
      let luckyNumbers = [1, 2, 3, 4, 5, 6];

      expect(lottery.checkTicket(ticketNumbers, luckyNumbers)).to.be.equal(
        'You win the JACKPOT!!!'
      );
    });
  });
  describe('secondChance()', () => {
    it('Validate the data 1', () => {
      let ticketID = '7';
      let secondChanceWinningIDs = [4, 2, 6];

      expect(() => {
        lottery.secondChance(ticketID, secondChanceWinningIDs);
      }).to.throw(Error, 'Invalid input!');
    });
    it('Validate the data 2', () => {
      let ticketID = 7;
      let secondChanceWinningIDs = '[4,2,6]';

      expect(() => {
        lottery.secondChance(ticketID, secondChanceWinningIDs);
      }).to.throw(Error, 'Invalid input!');
    });
    it('Valid data for You win our second chance prize!', () => {
      let ticketID = 2;
      let secondChanceWinningIDs = [1, 2, 3];

      expect(
        lottery.secondChance(ticketID, secondChanceWinningIDs)
      ).to.be.equal('You win our second chance prize!');
    });
    it('Valid data for Sorry', () => {
      let ticketID = 7;
      let secondChanceWinningIDs = [1, 2, 3];

      expect(
        lottery.secondChance(ticketID, secondChanceWinningIDs)
      ).to.be.equal("Sorry, your ticket didn't win!");
    });
  });
});