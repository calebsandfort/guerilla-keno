import Sequelize from "sequelize";
import * as entityQuery from "../utilities/entityQuery";

export default {
  Query: {
    payTableRows: async (parent, { offset = 0, limit = 0, order = "idx ASC" }, { models }) => {
      const params = {};

      if (limit > 0) {
        params.offset = offset;
        params.limit = limit;
      }

      if (order != "") {
        params.order = Sequelize.literal(order);
      }

      return await models.PayTableRow.findAll(params);
    },
    payTableRowsQueryable: async (parent, { query }, { models }) => {
      const params = entityQuery.entityQueryToSequelize(query);
      return await models.PayTableRow.findAll(params);
    },
    payTableRow: async (parent, { id }, { models }) => {
      return await models.PayTableRow.findByPk(id);
    }
  },

  Mutation: {
    createPayTableRow: async (parent, { input }, { models }) => {
      return await models.PayTableRow.create(input);
    },

    updatePayTableRow: async (parent, { id, input }, { models }) => {
      const payTableRow = await models.PayTableRow.findByPk(id);
      return await payTableRow.update(input);
    },

    deletePayTableRow: async (parent, { id }, { models }) => {
      return await models.PayTableRow.destroy({
        where: { id }
      });
    }
  },

  PayTableRow: {}
};
