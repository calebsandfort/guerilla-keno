import Sequelize from "sequelize";
import * as entityQuery from "../utilities/entityQuery";
import _ from "lodash";
import gameSlipPropertyNames from "../propertyNames/gameSlip";

export default {
  Query: {
    gameSlips: async (parent, { offset = 0, limit = 0, order = "idx ASC", includeGames = false }, { models }) => {
      const params = {};

      if (limit > 0) {
        params.offset = offset;
        params.limit = limit;
      }

      if (order != "") {
        params.order = Sequelize.literal(order);
      }

      if (includeGames) {
        params.include = [{ model: models.Game, as: "games" }];
      }

      return await models.GameSlip.findAll(params);
    },
    gameSlipsQueryable: async (parent, { query, includeGames = false }, { models }) => {
      const params = entityQuery.entityQueryToSequelize(query);

      if (includeGames) {
        params.include = [{ model: models.Game, as: "games" }];
      }

      return await models.GameSlip.findAll(params);
    },
    gameSlipsCount: async (parent, { query = null }, { models }) => {
      if (query == null) return await models.GameSlip.count();
      else {
        const params = entityQuery.entityQueryToSequelize(query);
        return await models.GameSlip.count(params);
      }
    },
    gameSlipsMin: async (parent, { propertyName = gameSlipPropertyNames.profit, query = null }, { models }) => {
      if (query == null) return await models.GameSlip.min(propertyName);
      else {
        const params = entityQuery.entityQueryToSequelize(query);
        return await models.GameSlip.min(propertyName, params);
      }
    },
    gameSlipsMax: async (parent, { propertyName = gameSlipPropertyNames.profit, query = null }, { models }) => {
      if (query == null) return await models.GameSlip.max(propertyName);
      else {
        const params = entityQuery.entityQueryToSequelize(query);
        return await models.GameSlip.max(propertyName, params);
      }
    },
    gameSlip: async (parent, { id, includeGames = false }, { models }) => {
      let params = {};

      if (includeGames) {
        params.include = [{ model: models.Game, as: "games" }];
      }

      return await models.GameSlip.findByPk(id, params);
    }
  },

  Mutation: {
    createGameSlip: async (parent, { input }, { models }) => {
      input.numbers = input.numbersArray.join(",");

      delete input.numbersArray;

      const gameSlip = await models.GameSlip.create(input);

      if (typeof input.gameIds != "undefined" && input.gameIds.length > 0) {
        for (let i = 0; i < input.gameIds; i++) {
          await gameSlip.addGame(await models.Game.findByPk(input.gameIds[i]));
        }
      }

      return gameSlip;
    },

    updateGameSlip: async (parent, { id, input }, { models }) => {
      const gameSlip = await models.GameSlip.findByPk(id);
      input.numbers = input.numbersArray.join(",");
      delete input.numbersArray;
      return await gameSlip.update(input);
    },

    deleteGameSlip: async (parent, { id }, { models }) => {
      return await models.GameSlip.destroy({
        where: { id }
      });
    }
  },

  GameSlip: {
    numbersArray: async (gameSlip, args, { models }) => {
      return _.map(gameSlip.numbers.split(","), function(x) {
        return parseInt(x);
      });
    }
  }
};
