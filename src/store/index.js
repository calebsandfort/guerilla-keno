import Vue from "vue";
import Vuex from "vuex";
import payTable from "./modules/payTable";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    payTable
  },
  strict: debug
});
