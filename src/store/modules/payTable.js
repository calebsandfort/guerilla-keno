import { apolloClient } from "../../apollo";
import payTableApi from "../../api/payTable";
import * as entityQuery from "../../utilities/entityQuery";
import payTablePropertyNames from "../../backend/propertyNames/payTable";

const state = {
  payTables: []
};

const getters = {};

const mutations = {
  setPayTables(state, list) {
    state.payTables = list;
  }
};

const actions = {
  async fetchPayTables({ dispatch, commit, state }) {
    if (state.payTables.length == 0) {
      const rv = payTableApi.getRequestVariables();
      rv.query = entityQuery.entityQueryCtor({
        sortExpression: `${payTablePropertyNames.spots} ASC, ${payTablePropertyNames.special} ASC`
      });

      const response = await payTableApi.getAllQueryable(apolloClient, rv);
      commit("setPayTables", response.data.payTablesQueryable);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
