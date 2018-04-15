const assert = require('assert');
const debug  = require('debug')('test:compareCards');

const compareCards = require('src/compareCards');
const testData     = require('./data/testData');

describe('Compare two deck of cards unit test', () => {
  before(() => {
    debug('Compare two deck of cards unit test begin');
  });

  it('Pass incomplete deck of cards', () => {
    const funcRef = compareCards.bind(compareCards, testData.incompleteCards, testData.incompleteCards);
    assert.throws(funcRef, /The number of cards should be/);
  });

  it('Pass invalid suit of card', () => {
    const funcRef = compareCards.bind(compareCards, testData.invalidSuit, testData.straight);
    assert.throws(funcRef, /invalid suit/);
  });

  it('Pass invalid rank of card', () => {
    const funcRef = compareCards.bind(compareCards, testData.invalidRank, testData.straight);
    assert.throws(funcRef, /invalid rank/);
  });

  after(() => {
    debug('Compare two deck of cards unit test end');
  });
});
