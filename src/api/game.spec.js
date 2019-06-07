import { getClient } from "./apollo-client-factory";
import { expect } from "chai";
import gameApi from "./game";
import oregonLotteryService from "../backend/scrape/oregonLotteryService";
import moment from "moment";
import * as entityQuery from "../utilities/entityQuery";
import gamePropertyNames from "../backend/propertyNames/game";

let client = null;

describe("game api", () => {
  before("before game api", function(done) {
    client = getClient();
    done();
  });

  // it("scrapes a date's games", function() {
  //   this.timeout(10 * 60 * 1000);
  //
  //   const expectedResult = 322;
  //
  //   return oregonLotteryService
  //     .scrapeDateRange("04/10/2019", "04/10/2019")
  //     .then(function(scrapedGames) {
  //       expect(scrapedGames.length).to.eql(expectedResult);
  //
  //       return gameApi.createFromList(client, scrapedGames);
  //     })
  //     .then(function(response) {
  //       expect(response.length).to.eql(expectedResult);
  //     });
  // });

  // it("scrapes a year's games", function() {
  //   this.timeout(10 * 60 * 60 * 1000);
  //
  //   return oregonLotteryService.scrapeYear(client);
  // });

  // it("returns a total count of games", async () => {
  //   const expectedResult = 3142;
  //
  //   const rv = gameApi.getRequestVariables();
  //   const result = await gameApi.count(client, rv);
  //
  //   expect(result.data.gamesCount).to.eql(expectedResult);
  // });
  //
  // it("returns a count of games for a specified date", async () => {
  //   const expectedResult = 322;
  //
  //   const date = moment(1554880680000, "x");
  //   const startOfDay = date.startOf("day").format("x");
  //   const endOfDay = date.endOf("day").format("x");
  //
  //   const rv = gameApi.getRequestVariables();
  //   rv.query = entityQuery.entityQueryCtor({
  //     searchFilters: [
  //       entityQuery.searchFilterCtor({
  //         isAndFilter: true,
  //         propertyName: gamePropertyNames.date,
  //         condition: entityQuery.SearchFilterCondition.IsGreaterThanOrEqual,
  //         valueString: startOfDay
  //       }),
  //       entityQuery.searchFilterCtor({
  //         isAndFilter: true,
  //         propertyName: gamePropertyNames.date,
  //         condition: entityQuery.SearchFilterCondition.IsLessThanOrEqual,
  //         valueString: endOfDay
  //       })
  //     ]
  //   });
  //
  //   const result = await gameApi.count(client, rv);
  //
  //   expect(result.data.gamesCount).to.eql(expectedResult);
  // });
  //
  // it("returns a count of games for a specified period", async () => {
  //   const expectedResult = 4;
  //
  //   const date = moment(1554880680000, "x");
  //   const startOfDay = date.startOf("day").format("x");
  //   const endOfDay = date.add(15, "minutes").format("x");
  //
  //   const rv = gameApi.getRequestVariables();
  //   rv.query = entityQuery.entityQueryCtor({
  //     searchFilters: [
  //       entityQuery.searchFilterCtor({
  //         isAndFilter: true,
  //         propertyName: gamePropertyNames.date,
  //         condition: entityQuery.SearchFilterCondition.IsGreaterThanOrEqual,
  //         valueString: startOfDay
  //       }),
  //       entityQuery.searchFilterCtor({
  //         isAndFilter: true,
  //         propertyName: gamePropertyNames.date,
  //         condition: entityQuery.SearchFilterCondition.IsLessThanOrEqual,
  //         valueString: endOfDay
  //       })
  //     ]
  //   });
  //
  //   const result = await gameApi.count(client, rv);
  //
  //   expect(result.data.gamesCount).to.eql(expectedResult);
  // });
  //
  // it("returns the min game date", async () => {
  //   const expectedResult = "04/10/2019";
  //
  //   const rv = gameApi.getRequestVariables();
  //   rv.propertyName = gamePropertyNames.date;
  //
  //   const result = await gameApi.min(client, rv);
  //   const resultDate = moment(result.data.gamesMin, "x").format("MM/DD/YYYY");
  //
  //   expect(resultDate).to.eql(expectedResult);
  // });
  //
  // it("returns the max game date", async () => {
  //   const expectedResult = "06/06/2019";
  //
  //   const rv = gameApi.getRequestVariables();
  //   rv.propertyName = gamePropertyNames.date;
  //
  //   const result = await gameApi.max(client, rv);
  //   const resultDate = moment(result.data.gamesMax, "x").format("MM/DD/YYYY");
  //
  //   expect(resultDate).to.eql(expectedResult);
  // });
});
