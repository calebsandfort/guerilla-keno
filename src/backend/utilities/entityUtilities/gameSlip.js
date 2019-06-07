import _ from "lodash";

const create = () => {
  return {
    spots: 0,
    wager: 0,
    gamesToPlay: 0,
    special: false,
    numbers: "",
    numbersArray: [],
    startHour: -1,
    cost: 0,
    winnings: 0,
    profit: 0,
    gameIds: [],
    playId: null
  };
};

const print = gameSlip => {
  console.table([
    {
      cost: gameSlip.cost,
      winnings: gameSlip.winnings,
      profit: gameSlip.profit
    }
  ]);
};

const scoreGames = (gameSlip, games, payTables) => {
  for (let i = 0; i < games.length; i++) {
    scoreGame(gameSlip, games[i], payTables);
  }
};

const scoreGame = (gameSlip, game, payTables) => {
  const hits = _.chain(gameSlip.numbersArray)
    .countBy(function(x) {
      return game.numbersArray.indexOf(x) > -1;
    })
    .get("true", 0)
    .value();

  const winnings = _.chain(payTables)
    .find(function(x) {
      return x.spots == gameSlip.spots && x.special == gameSlip.special;
    })
    .get("rows", [])
    .find(function(x) {
      return x.hits == hits;
    })
    .get("pays", 0)
    .value();

  gameSlip.cost += gameSlip.wager;
  gameSlip.winnings += winnings;
  gameSlip.profit = gameSlip.winnings - gameSlip.cost;
  gameSlip.gameIds.push(game.id);
};

export default {
  create,
  scoreGames,
  scoreGame,
  print
};
