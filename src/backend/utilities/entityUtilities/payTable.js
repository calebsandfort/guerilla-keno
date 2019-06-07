import _ from "lodash";
import * as math from "mathjs";

const createPayTable = (spots, special, prizes) => {
  const payTable = {
    spots,
    special,
    rows: _.map(prizes, function(x, idx) {
      return getComboStats(spots, spots - idx, x);
    }),
    totalCombinations: math.combinations(80, spots),
    hitFrequency: 0,
    paybackPercentage: 0
  };

  payTable.hitFrequency =
    _.sumBy(payTable.rows, function(x) {
      return x.payingCombinations;
    }) / payTable.totalCombinations;

  payTable.paybackPercentage =
    _.sumBy(payTable.rows, function(x) {
      return x.return;
    }) /
    _.sumBy(payTable.rows, function(x) {
      return x.combinations;
    });

  //hitFrequency
  //paybackPercentage

  return payTable;
};

const getComboStats = (spots, hits, pays) => {
  const wins = math.combinations(20, hits);
  const misses = math.combinations(60, spots - hits);
  const combinations = wins * misses;
  const ret = combinations * pays;
  const payingCombinations = pays > 0 ? combinations : 0;

  return {
    hits,
    pays,
    combinations,
    payingCombinations,
    return: ret
  };
};

export default {
  createPayTable
};
