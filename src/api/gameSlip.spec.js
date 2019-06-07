import { getClient } from "./apollo-client-factory";
import { expect } from "chai";
import gameSlipApi from "./gameSlip";
import gameApi from "./game";
import payTableApi from "./payTable";
import moment from "moment";
import * as entityQuery from "../utilities/entityQuery";
import gameSlipPropertyNames from "../backend/propertyNames/gameSlip";
import entityUtilites from "../backend/utilities/entityUtilities/";

let client = null;
let payTables = [];

describe("gameSlip api", () => {
  before("before gameSlip api", function(done) {
    client = getClient();

    const payTableRv = payTableApi.getRequestVariables();

    payTableApi.getAll(client, payTableRv).then(function(response) {
      payTables = response.data.payTables;
      done();
    });
  });

  it("scores a single game", async () => {
    const gameSlip = entityUtilites.gameSlip.create();
    gameSlip.spots = 7;
    gameSlip.wager = 1;
    gameSlip.gamesToPlay = 1;
    gameSlip.special = true;
    gameSlip.numbersArray = [3, 5, 6, 13, 17, 22, 24];

    const gameRv = gameApi.getRequestVariables();
    gameRv.id = "121218";
    const game = (await gameApi.get(client, gameRv)).data.game;

    entityUtilites.gameSlip.scoreGame(gameSlip, game, payTables);

    const expectedResult = {
      cost: 1,
      winnings: 20,
      profit: 19
    };

    const result = {
      cost: gameSlip.cost,
      winnings: gameSlip.winnings,
      profit: gameSlip.profit
    };

    expect(result).to.eql(expectedResult);
  });

  it("scores multiple games", async () => {
    const gameSlip = entityUtilites.gameSlip.create();
    gameSlip.spots = 7;
    gameSlip.wager = 1;
    gameSlip.gamesToPlay = 2;
    gameSlip.special = true;
    gameSlip.numbersArray = [3, 5, 6, 13, 17, 22, 24];

    const gameRv = gameApi.getRequestVariables();
    gameRv.id = "121218";
    const game = (await gameApi.get(client, gameRv)).data.game;

    entityUtilites.gameSlip.scoreGames(gameSlip, [game, game], payTables);

    const expectedResult = {
      cost: 2,
      winnings: 40,
      profit: 38
    };

    const result = {
      cost: gameSlip.cost,
      winnings: gameSlip.winnings,
      profit: gameSlip.profit
    };

    expect(result).to.eql(expectedResult);
  });
});
