const debug     = require('debug')('compareCards');
const util      = require('util');
const cardConst = require('src/constant/index');

function checkDeckInvalid(inDeck) {
  if (inDeck.length !== cardConst.CARDS_NUM) {
    throw new Error(`The number of cards should be ${cardConst.CARDS_NUM} instead of ${inDeck.length}`);
  }

  const invalidSuit = inDeck.filter(obj => cardConst.VALID_SUITS.indexOf(obj.suit) === -1);
  if (invalidSuit.length > 0) {
    throw new Error(`There are invalid suit ${util.inspect(invalidSuit, false, null)} in deck`);
  }

  const invalidRank = inDeck.filter(obj => obj.rank < cardConst.MIN_RANK || obj.rank > cardConst.MAX_RANK);
  if (invalidRank.length > 0) {
    throw new Error(`There are invalid rank ${util.inspect(invalidSuit, false, null)} in deck`);
  }
}

function compareCards(deck1, deck2) {
  debug(`Check deck1 ${util.inspect(deck1, false, null)}`);
  checkDeckInvalid(deck1);

  debug(`Check deck2 ${util.inspect(deck2, false, null)}`);
  checkDeckInvalid(deck2);

  return {
    winner:   '',
    category: '',
  };
}

module.exports = compareCards;
