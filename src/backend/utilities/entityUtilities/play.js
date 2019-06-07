import gameSlipUtilities from "./gameSlip";

const create = () => {
  return {
    date: 0,
    dateDisplay: 0,
    cost: 0,
    winnings: 0,
    profit: 0,
    gameSlips: []
  };
};

const print = play => {
  console.table([
    {
      cost: play.cost,
      winnings: play.winnings,
      profit: play.profit
    }
  ]);
};

const score = (play, games, payTables) => {
  debugger;
  for (let i = 0; i < play.gameSlips.length; i++) {
    gameSlipUtilities.scoreGames(play.gameSlips[i], games, payTables);
    play.cost += play.gameSlips[i].cost;
    play.winnings += play.gameSlips[i].winnings;
    play.profit = play.winnings - play.cost;
  }
};

export default {
  print,
  create,
  score
};
