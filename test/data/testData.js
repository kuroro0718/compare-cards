// Define test data
const incompleteCards = [
  {
    suit: 'diamonds',
    rank: 1,
  },
  {
    suit: 'diamonds',
    rank: 2,
  },
  {
    suit: 'diamonds',
    rank: 3,
  },
  {
    suit: 'diamonds',
    rank: 4,
  },
];

const invalidSuit = [
  {
    suit: 'diamonds',
    rank: 1,
  },
  {
    suit: 'diamonds',
    rank: 2,
  },
  {
    suit: 'diamonds',
    rank: 3,
  },
  {
    suit: 'diamonds-error',
    rank: 4,
  },
  {
    suit: 'diamonds',
    rank: 5,
  },
];

const invalidRank = [
  {
    suit: 'diamonds',
    rank: 0,
  },
  {
    suit: 'diamonds',
    rank: 2,
  },
  {
    suit: 'diamonds',
    rank: 3,
  },
  {
    suit: 'diamonds',
    rank: 4,
  },
  {
    suit: 'diamonds',
    rank: 15,
  },
];

const straightFlush = [
  {
    suit: 'clubs',
    rank: 1,
  },
  {
    suit: 'clubs',
    rank: 2,
  },
  {
    suit: 'clubs',
    rank: 3,
  },
  {
    suit: 'clubs',
    rank: 4,
  },
  {
    suit: 'clubs',
    rank: 5,
  },
];

const straight = [
  {
    suit: 'clubs',
    rank: 1,
  },
  {
    suit: 'diamonds',
    rank: 2,
  },
  {
    suit: 'clubs',
    rank: 3,
  },
  {
    suit: 'spades',
    rank: 4,
  },
  {
    suit: 'clubs',
    rank: 5,
  },
];

const fourOfAKind = [
  {
    suit: 'clubs',
    rank: 4,
  },
  {
    suit: 'diamonds',
    rank: 4,
  },
  {
    suit: 'hearts',
    rank: 4,
  },
  {
    suit: 'clubs',
    rank: 4,
  },
  {
    suit: 'spades',
    rank: 5,
  },
];

const fullHouse = [
  {
    suit: 'clubs',
    rank: 4,
  },
  {
    suit: 'diamonds',
    rank: 4,
  },
  {
    suit: 'spades',
    rank: 4,
  },
  {
    suit: 'clubs',
    rank: 5,
  },
  {
    suit: 'spades',
    rank: 5,
  },
];

const flush = [
  {
    suit: 'clubs',
    rank: 3,
  },
  {
    suit: 'clubs',
    rank: 4,
  },
  {
    suit: 'clubs',
    rank: 5,
  },
  {
    suit: 'clubs',
    rank: 7,
  },
  {
    suit: 'clubs',
    rank: 9,
  },
];

const unmatched = [
  {
    suit: 'clubs',
    rank: 4,
  },
  {
    suit: 'diamonds',
    rank: 5,
  },
  {
    suit: 'spades',
    rank: 6,
  },
  {
    suit: 'clubs',
    rank: 9,
  },
  {
    suit: 'spades',
    rank: 5,
  },
];

const testData = {
  incompleteCards,
  invalidSuit,
  invalidRank,
  straightFlush,
  straight,
  fourOfAKind,
  fullHouse,
  flush,
  unmatched,
};

module.exports = testData;
