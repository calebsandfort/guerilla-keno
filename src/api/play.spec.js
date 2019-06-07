import { getClient } from "./apollo-client-factory";
import { expect } from "chai";
import gameApi from "./game";
import payTableApi from "./payTable";
import moment from "moment";
import * as entityQuery from "../utilities/entityQuery";
import entityUtilites from "../backend/utilities/entityUtilities";
import _ from "lodash";

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

  it("scores a single play", async () => {
    const gameSlip = entityUtilites.gameSlip.create();
    gameSlip.spots = 7;
    gameSlip.wager = 1;
    gameSlip.gamesToPlay = 2;
    gameSlip.special = true;
    gameSlip.numbersArray = [3, 5, 6, 13, 17, 22, 24];

    const gameRv = gameApi.getRequestVariables();
    gameRv.id = "121218";
    const game = (await gameApi.get(client, gameRv)).data.game;

    const play = entityUtilites.play.create();
    play.gameSlips = [_.cloneDeep(gameSlip), _.cloneDeep(gameSlip)];

    entityUtilites.play.score(play, [game, game], payTables);

    const expectedResult = {
      cost: 4,
      winnings: 80,
      profit: 76
    };

    const result = {
      cost: play.cost,
      winnings: play.winnings,
      profit: play.profit
    };

    expect(result).to.eql(expectedResult);
  });
});
