const assert = require('assert');
const debug  = require('debug')('test:compareCards');

const compareCards = require('src/compareCards');
const cardConst    = require('src/constant');
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

  it('Compare straight flush and other category', () => {
    let result = compareCards(testData.straightFlush, testData.fourOfAKind);
    assert.equal(result.winner, 'Deck1', 'The winner should be Deck1');
    assert.equal(result.category, cardConst.StraightFlush, 'The winning category should be StraightFlush');

    result = compareCards(testData.straightFlush, testData.fullHouse);
    assert.equal(result.winner, 'Deck1', 'The winner should be Deck1');

    result = compareCards(testData.straightFlush, testData.fullHouse);
    assert.equal(result.winner, 'Deck1', 'The winner should be Deck1');

    result = compareCards(testData.straightFlush, testData.flush);
    assert.equal(result.winner, 'Deck1', 'The winner should be Deck1');

    result = compareCards(testData.straightFlush, testData.straight);
    assert.equal(result.winner, 'Deck1', 'The winner should be Deck1');
  });

  it('Compare four of a kind and other category', () => {
    let result = compareCards(testData.fourOfAKind, testData.fullHouse);
    assert.equal(result.winner, 'Deck1', 'The winner should be Deck1');
    assert.equal(result.category, cardConst.FourOfAKind, 'The winning category should be FourOfAKind');

    result = compareCards(testData.fourOfAKind, testData.flush);
    assert.equal(result.winner, 'Deck1', 'The winner should be Deck1');

    result = compareCards(testData.fourOfAKind, testData.straight);
    assert.equal(result.winner, 'Deck1', 'The winner should be Deck1');
  });

  it('Compare full house and other category', () => {
    let result = compareCards(testData.fullHouse, testData.flush);
    assert.equal(result.winner, 'Deck1', 'The winner should be Deck1');
    assert.equal(result.category, cardConst.FullHouse, 'The winning category should be FullHouse');

    result = compareCards(testData.fullHouse, testData.straight);
    assert.equal(result.winner, 'Deck1', 'The winner should be Deck1');
  });

  it('Compare flush and other category', () => {
    const result = compareCards(testData.flush, testData.straight);
    assert.equal(result.winner, 'Deck1', 'The winner should be Deck1');
    assert.equal(result.category, cardConst.Flush, 'The winning category should be Flush');
  });

  after(() => {
    debug('Compare two deck of cards unit test end');
  });
});
