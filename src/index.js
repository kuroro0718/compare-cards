const compareCards = require('./compareCards');
const debug        = require('debug')('main');
const util         = require('util');

function main() {
  debug('Compare two deck of cards start');

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

  debug(`Compare ${util.inspect(straightFlush, false, null)} with ${util.inspect(straight, false, null)}`);
  const result = compareCards(straight, straightFlush);
  debug(`Result: ${util.inspect(result, false, null)}`);
}

main();
