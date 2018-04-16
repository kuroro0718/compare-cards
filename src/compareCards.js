const debug     = require('debug')('compareCards');
const util      = require('util');
const cardConst = require('src/constant');

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

function checkDeckCategory(inDeck) {
  // 判斷手牌是否為同花
  const suitCategory = {};
  for (const cardObj of inDeck) {
    if (suitCategory[cardObj.suit]) {
      suitCategory[cardObj.suit] += 1;
    } else {
      suitCategory[cardObj.suit] = 1;
    }
  }
  const flushArray = Object.values(suitCategory).filter(val => val === 5);

  return flushArray.length > 0;
}

function checkStraight(inDeck) {
  let bIsStraight = false;
  // 判斷手牌是否為順子
  const rankArray = inDeck.map(obj => obj.rank);
  if (rankArray[rankArray.length - 1] - rankArray[0] === cardConst.FOUR_OF_A_KIND_NUM && rankArray[rankArray.length - 2] - rankArray[1] === 2) {
    bIsStraight = true;
  }

  return bIsStraight;
}

function checkSameRank(inDeck) {
  // 判斷手牌有幾張同數字的牌
  const rankObj = {};
  for (const cardObj of inDeck) {
    if (rankObj[cardObj.rank]) {
      rankObj[cardObj.rank] += 1;
    } else {
      rankObj[cardObj.rank] = 1;
    }
  }
  // 只需要確認3張以上同數字的牌
  const rankArray = Object.values(rankObj).filter(val => val >= cardConst.FULL_HOUSE_NUM);
  if (rankArray.includes(cardConst.FOUR_OF_A_KIND_NUM)) {
    // 鐵支
    return {
      sameRankNum: cardConst.FOUR_OF_A_KIND_NUM,
      maxRank:     parseInt(Object.keys(rankObj).find(key => rankObj[key] === cardConst.FOUR_OF_A_KIND_NUM), 10),
    };
  } else if (rankArray.includes(cardConst.FULL_HOUSE_NUM)) {
    // 葫蘆還需要確認其它二張數字一樣
    if (Object.values(rankObj).filter(val => val === cardConst.PAIR_NUM).length > 0) {
      return {
        sameRankNum: cardConst.FULL_HOUSE_NUM,
        maxRank:     parseInt(Object.keys(rankObj).find(key => rankObj[key] === cardConst.FULL_HOUSE_NUM), 10),
      };
    }
  }

  // 不符合鐵支或葫蘆，則 rank 回傳最大的手牌
  return {
    sameRankNum: 0,
    maxRank:     Math.max(...Object.keys(rankObj).map(val => parseInt(val, 10))),
  };
}

function checkDeckType(bIsFlush, bIsStraight, rankObj) {
  if (bIsFlush && bIsStraight) {
    return {
      category: cardConst.Category.StraightFlush,
      maxRank:  rankObj.maxRank,
    };
  } else if (bIsFlush && !bIsStraight) {
    return {
      category: cardConst.Category.Flush,
      maxRank:  rankObj.maxRank,
    };
  } else if (!bIsFlush && !bIsStraight) {
    if (rankObj.sameRankNum === cardConst.FOUR_OF_A_KIND_NUM) {
      return {
        category: cardConst.Category.FourOfAKind,
        maxRank:  rankObj.maxRank,
      };
    } else if (rankObj.sameRankNum === cardConst.FULL_HOUSE_NUM) {
      return {
        category: cardConst.Category.FullHouse,
        maxRank:  rankObj.maxRank,
      };
    }
  } else if (bIsStraight) {
    return {
      category: cardConst.Category.Straight,
      maxRank:  rankObj.maxRank,
    };
  }

  return {
    category: cardConst.Category.Unmatched,
    maxRank:  rankObj.maxRank,
  };
}

function compareCards(deck1, deck2) {
  // 檢查手牌
  checkDeckInvalid(deck1);
  checkDeckInvalid(deck2);

  debug(`Check deck1 ${util.inspect(deck1, false, null)}`);
  let bIsFlush       = checkDeckCategory(deck1);
  let bIsStraight    = checkStraight(deck1);
  const deck1RankObj = checkSameRank(deck1);
  const deck1Type    = checkDeckType(bIsFlush, bIsStraight, deck1RankObj);

  debug(`Check deck2 ${util.inspect(deck2, false, null)}`);
  bIsFlush = checkDeckCategory(deck2);
  bIsStraight = checkStraight(deck2);
  const deck2RankObj = checkSameRank(deck2);
  const deck2Type    = checkDeckType(bIsFlush, bIsStraight, deck2RankObj);

  // 比較手牌大小, 先比牌面，如果同牌面再比數字大小
  const result = {};
  if (deck1Type.category > deck2Type.category) {
    result.winner = 'Deck1';
    result.category = Object.keys(cardConst.Category).find(key => cardConst.Category[key] === deck1Type.category);
  } else if (deck1Type.category < deck2Type.category) {
    result.winner = 'Deck2';
    result.category = Object.keys(cardConst.Category).find(key => cardConst.Category[key] === deck2Type.category);
  } else if (deck1Type.maxRank > deck2Type.maxRank) {
    // 平局，看數字大小
    result.winner = 'Deck1';
    result.category = Object.keys(cardConst.Category).find(key => cardConst.Category[key] === deck1Type.category);
  } else if (deck1Type.maxRank < deck2Type.maxRank) {
    result.winner = 'Deck2';
    result.category = Object.keys(cardConst.Category).find(key => cardConst.Category[key] === deck2Type.category);
  } else {
    result.winner = 'Draw';
    result.category = Object.keys(cardConst.Category).find(key => cardConst.Category[key] === deck1Type.category);
  }

  return result;
}

module.exports = compareCards;
