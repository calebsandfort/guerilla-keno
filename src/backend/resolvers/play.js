import Sequelize from "sequelize";
import * as entityQuery from "../utilities/entityQuery";
import _ from "lodash";
import playPropertyNames from "../propertyNames/play";
import payTableRowPropertyNames from "../propertyNames/payTableRow";

export default {
  Query: {
    plays: async (parent, { offset = 0, limit = 0, order = "idx ASC" }, { models }) => {
      const params = {};

      if (limit > 0) {
        params.offset = offset;
        params.limit = limit;
      }

      if (order != "") {
        params.order = Sequelize.literal(order);
      }

      return await models.Play.findAll(params);
    },
    playsQueryable: async (parent, { query }, { models }) => {
      const params = entityQuery.entityQueryToSequelize(query);
      return await models.Play.findAll(params);
    },
    playsCount: async (parent, { query = null }, { models }) => {
      if (query == null) return await models.Play.count();
      else {
        const params = entityQuery.entityQueryToSequelize(query);
        return await models.Play.count(params);
      }
    },
    playsMin: async (parent, { propertyName = playPropertyNames.profit, query = null }, { models }) => {
      if (query == null) return await models.Play.min(propertyName);
      else {
        const params = entityQuery.entityQueryToSequelize(query);
        return await models.Play.min(propertyName, params);
      }
    },
    playsMax: async (parent, { propertyName = playPropertyNames.profit, query = null }, { models }) => {
      if (query == null) return await models.Play.max(propertyName);
      else {
        const params = entityQuery.entityQueryToSequelize(query);
        return await models.Play.max(propertyName, params);
      }
    },
    play: async (parent, { id }, { models }) => {
      return await models.Play.findByPk(id);
    }
  },

  Mutation: {
    createPlay: async (parent, { input }, { models }) => {
      const play = await models.Play.create(input);

      const collectionPromises = [];

      if (typeof input.gameSlips != "undefined" && input.gameSlips.length > 0) {
        input.gameSlips.forEach(function(gameSlip) {
          gameSlip.playId = play.id;
          collectionPromises.push(models.GameSlip.create(gameSlip));
        });
      }

      if (collectionPromises.length > 0) {
        await Promise.all(collectionPromises);
      }

      return play;
    },

    updatePlay: async (parent, { id, input }, { models }) => {
      const play = await models.Play.findByPk(id);
      return await play.update(input);
    },

    deletePlay: async (parent, { id }, { models }) => {
      return await models.Play.destroy({
        where: { id }
      });
    }
  },

  Play: {
    gameSlips: async (play, args, { models }) => {
      return await models.GameSlip.findAll({
        where: {
          playId: play.id
        }
      });
    }
  }
};
