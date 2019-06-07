import { getClient } from "./apollo-client-factory";
import { expect } from "chai";
import payTableApi from "./payTable";

let client = null;

describe("payTable api", () => {
  before("before payTable api", function(done) {
    client = getClient();
    done();
  });

  // it("scrapes payTables", function() {
  //   this.timeout(10 * 60 * 1000);
  //
  //   const payTablesList = [
  //     payoutTableUtilites.createPayTable(3, false, [27, 2, 0, 0]),
  //     payoutTableUtilites.createPayTable(3, true, [47, 0, 0, 0]),
  //
  //     payoutTableUtilites.createPayTable(4, false, [72, 5, 1, 0, 0]),
  //     payoutTableUtilites.createPayTable(4, true, [140, 5, 0, 0, 0]),
  //
  //     payoutTableUtilites.createPayTable(5, false, [465, 15, 2, 0, 0, 0]),
  //     payoutTableUtilites.createPayTable(5, true, [800, 12, 0, 0, 0, 0]),
  //
  //     payoutTableUtilites.createPayTable(6, false, [1600, 55, 5, 1, 0, 0, 0]),
  //     payoutTableUtilites.createPayTable(6, true, [2500, 90, 2, 0, 0, 0, 0]),
  //
  //     payoutTableUtilites.createPayTable(7, false, [5500, 150, 15, 2, 1, 0, 0, 0]),
  //     payoutTableUtilites.createPayTable(7, true, [7500, 330, 20, 1, 0, 0, 0, 0]),
  //
  //     payoutTableUtilites.createPayTable(8, false, [15000, 600, 60, 10, 2, 0, 0, 0, 0]),
  //     payoutTableUtilites.createPayTable(8, true, [25000, 1750, 75, 5, 0, 0, 0, 0, 0]),
  //
  //     payoutTableUtilites.createPayTable(9, false, [50000, 3000, 215, 25, 4, 1, 0, 0, 0, 0]),
  //     payoutTableUtilites.createPayTable(9, true, [75000, 4000, 300, 40, 2, 0, 0, 0, 0, 0]),
  //
  //     payoutTableUtilites.createPayTable(10, false, [200000, 4500, 500, 55, 10, 2, 0, 0, 0, 0, 5]),
  //     payoutTableUtilites.createPayTable(10, true, [1000000, 22000, 1200, 140, 4, 0, 0, 0, 0, 0, 0])
  //   ]
  //
  //   return payTableApi.createFromList(client, payTablesList).then(function (response) {
  //     expect(response.length).to.eql(payTablesList.length);
  //   });
  // });
});
