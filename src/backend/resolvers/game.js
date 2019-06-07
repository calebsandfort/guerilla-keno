import Sequelize from "sequelize";
import * as entityQuery from "../utilities/entityQuery";
import _ from "lodash";
import gamePropertyNames from "../propertyNames/game";

export default {
  Query: {
    games: async (parent, { offset = 0, limit = 0, order = "idx ASC" }, { models }) => {
      const params = {};

      if (limit > 0) {
        params.offset = offset;
        params.limit = limit;
      }

      if (order != "") {
        params.order = Sequelize.literal(order);
      }

      return await models.Game.findAll(params);
    },
    gamesQueryable: async (parent, { query }, { models }) => {
      const params = entityQuery.entityQueryToSequelize(query);
      return await models.Game.findAll(params);
    },
    gamesCount: async (parent, { query = null }, { models }) => {
      if (query == null) return await models.Game.count();
      else {
        const params = entityQuery.entityQueryToSequelize(query);
        return await models.Game.count(params);
      }
    },
    gamesMin: async (parent, { propertyName = gamePropertyNames.date, query = null }, { models }) => {
      if (query == null) return await models.Game.min(propertyName);
      else {
        const params = entityQuery.entityQueryToSequelize(query);
        return await models.Game.min(propertyName, params);
      }
    },
    gamesMax: async (parent, { propertyName = gamePropertyNames.date, query = null }, { models }) => {
      if (query == null) return await models.Game.max(propertyName);
      else {
        const params = entityQuery.entityQueryToSequelize(query);
        return await models.Game.max(propertyName, params);
      }
    },
    game: async (parent, { id }, { models }) => {
      return await models.Game.findByPk(id);
    }
  },

  Mutation: {
    createGame: async (parent, { input }, { models }) => {
      input.numbers = input.numbersArray.join(",");

      delete input.numbersArray;

      const [game, created] = await models.Game.findOrCreate({
        where: { draw: input.draw },
        defaults: input
      });

      return game;
    },

    updateGame: async (parent, { id, input }, { models }) => {
      const game = await models.Game.findByPk(id);
      input.numbers = input.numbersArray.join(",");
      delete input.numbersArray;
      return await game.update(input);
    },

    deleteGame: async (parent, { id }, { models }) => {
      return await models.Game.destroy({
        where: { id }
      });
    }
  },

  Game: {
    numbersArray: async (game, args, { models }) => {
      return _.map(game.numbers.split(","), function(x) {
        return parseInt(x);
      });
    }
  }
};
