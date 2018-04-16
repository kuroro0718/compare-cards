const CARDS_NUM   = 5;
const VALID_SUITS = ['diamonds', 'clubs', 'hearts', 'spades'];
const MIN_RANK    = 1;
const MAX_RANK    = 13;

const FOUR_OF_A_KIND_NUM = 4;
const FULL_HOUSE_NUM     = 3;
const PAIR_NUM           = 2;

// 將手牌的類型用數字表示，以大小排列
const Category = {
  StraightFlush: 6,
  FourOfAKind:   5,
  FullHouse:     4,
  Flush:         3,
  Straight:      2,
  Unmatched:     1,
};

const cardConst = {
  CARDS_NUM,
  FOUR_OF_A_KIND_NUM,
  FULL_HOUSE_NUM,
  PAIR_NUM,
  MIN_RANK,
  MAX_RANK,
  VALID_SUITS,
  Category,
};

module.exports = cardConst;
