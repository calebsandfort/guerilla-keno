import { expect, use } from "chai";
import chaiExclude from "chai-exclude";
import _ from "lodash";

import oregonLotteryService from "./oregonLotteryService";

use(chaiExclude);

describe("oregon lottery service", () => {
  // it("finds results for a date range", function() {
  //   this.timeout(10 * 60 * 1000);
  //
  //   const expectedResult = 0;
  //
  //   return oregonLotteryService.scrapeDateRange("04/10/2019", "04/10/2019").then(function(response) {
  //     expect(response.length).to.eql(expectedResult);
  //   });
  // });
});
