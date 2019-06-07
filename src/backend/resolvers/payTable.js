import Sequelize from "sequelize";
import * as entityQuery from "../utilities/entityQuery";
import payTableRowPropertyNames from "../propertyNames/payTableRow";

export default {
  Query: {
    payTables: async (parent, { offset = 0, limit = 0, order = "id ASC" }, { models }) => {
      const params = {};

      if (limit > 0) {
        params.offset = offset;
        params.limit = limit;
      }

      if (order != "") {
        params.order = Sequelize.literal(order);
      }

      return await models.PayTable.findAll(params);
    },
    payTablesQueryable: async (parent, { query }, { models }) => {
      const params = entityQuery.entityQueryToSequelize(query);
      return await models.PayTable.findAll(params);
    },
    payTable: async (parent, { id }, { models }) => {
      return await models.PayTable.findByPk(id);
    }
  },

  Mutation: {
    createPayTable: async (parent, { input }, { models }) => {
      const payTable = await models.PayTable.create(input);

      const collectionPromises = [];

      if (typeof input.rows != "undefined" && input.rows.length > 0) {
        input.rows.forEach(function(row) {
          row.payTableId = payTable.id;
          collectionPromises.push(models.PayTableRow.create(row));
        });
      }

      if (collectionPromises.length > 0) {
        await Promise.all(collectionPromises);
      }

      return payTable;
    },

    updatePayTable: async (parent, { id, input }, { models }) => {
      const payTable = await models.PayTable.findByPk(id);
      return await payTable.update(input);
    },

    deletePayTable: async (parent, { id }, { models }) => {
      return await models.PayTable.destroy({
        where: { id }
      });
    }
  },

  PayTable: {
    rows: async (payTable, args, { models }) => {
      return await models.PayTableRow.findAll({
        where: {
          payTableId: payTable.id
        },
        order: Sequelize.literal(`${payTableRowPropertyNames.hits} DESC`)
      });
    }
  }
};
