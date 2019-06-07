import rp from "request-promise";
import $ from "cheerio";
import moment from "moment";
import _ from "lodash";
import scrapeUtilities from "../utilities/scrapeUtilities";
import gameApi from "../../api/game";

const FILE_PATH = "src/backend/scrape/files/";

const scrapeDateRange = async (fromDate, toDate) => {
  const results = [];

  const options = {
    method: "POST",
    uri: "https://www.oregonlottery.org/games/draw-games/keno/past-results",
    form: {
      PrintPage: false,
      GameCode: "KE",
      FromDate: fromDate,
      ToDate: toDate,
      NumberOfPages: 1,
      CurrentPageIndex: 0,
      PageSize: 0
    }
  };

  const html = await rp(options);

  //scrapeUtilities.writeFile(FILE_PATH + "scrapeDateRange.html", html);

  const rows = $("table.keno-table tr", html);
  let cells;

  if (rows.length > 0) {
    for (let i = 1; i < rows.length; i++) {
      cells = $(rows[i]).children("td");

      const game = {};
      //04/09/2019 07:02AM
      game.date = moment($(cells[0]).text(), "MM/DD/YYYY hh:mmA").format("x");
      game.dateDisplay = $(cells[0]).text();
      game.draw = parseInt($(cells[1]).text());
      game.numbersArray = _.chain(cells)
        .slice(2)
        .take(20)
        .map(function(x) {
          return parseInt($(x).text());
        })
        .value();

      results.push(game);
    }
  }

  return results;
};

const scrapeYear = async client => {
  let currentDay = moment("10/21/2018", "MM/DD/YYYY");
  let fromDate = "";
  let toDate = "";
  let scrapedGames = [];

  for (let i = 0; i < 365; i++) {
    fromDate = toDate = currentDay.format("MM/DD/YYYY");
    console.log(`scraping games for ${fromDate}...`);

    scrapedGames = await scrapeDateRange(fromDate, toDate);
    await gameApi.createFromList(client, scrapedGames);
    currentDay = currentDay.subtract(1, "days");
  }
};

export default {
  scrapeDateRange,
  scrapeYear
};
