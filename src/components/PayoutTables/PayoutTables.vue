<template>
  <v-container class="pa-0">
    <Toolbar back-path="/"></Toolbar>
    <v-content>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <template v-for="(payTable, idx) in payTables">
            <v-flex xs6 :key="`payTable${idx}`">
              <PayoutTable :payout-table="payTable"></PayoutTable>
            </v-flex>
          </template>
        </v-layout>
      </v-container>
    </v-content>
  </v-container>
</template>

<script>
import _ from "lodash";
import { mapState, mapMutations, mapActions } from "vuex";
import Toolbar from "../Toolbar";
import PayoutTable from "./PayoutTable";

export default {
  name: "PayoutTables",
  components: {
    Toolbar,
    PayoutTable
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      payTables: state => state.payTable.payTables
    })
    // example: function() {return {}}
  },
  watch: {
    // comps: function () {}
  },
  mounted() {
    this.fetchPayTables();
  },
  methods: {
    // ...mapMutations({
    //   example: "example/example",
    // }),
    ...mapActions({
      fetchPayTables: "payTable/fetchPayTables"
    })
    // example() {}
  }
};
</script>

<style scoped></style>
