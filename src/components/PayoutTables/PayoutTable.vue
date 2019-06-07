<template>
  <v-data-table
    :headers="headers"
    :pagination.sync="pagination"
    :hide-actions="true"
    :disable-initial-sort="true"
    :items="payoutTable.rows"
    item-key="hits"
    class="super-condensed-table elevation-1"
  >
    <template slot="headers" slot-scope="props">
      <tr class="blue">
        <th v-for="(header, index) in props.headers" :key="`header_${index}`" :class="['white--text', `text-xs-${header.align}`]">
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template v-slot:items="props">
      <tr :key="props.item.key">
        <td>
          {{ props.index == 0 ? payoutTable.spots : "" }}
        </td>
        <td class="text-xs-right">
          {{ props.item.hits }}
        </td>
        <td class="text-xs-right">
          {{ formatMoney(props.item.pays, { precision: 2 }) }}
        </td>

        <!--        <td class="text-xs-right">-->
        <!--          {{ props.item.combinations }}-->
        <!--        </td>-->
        <!--        <td class="text-xs-right">-->
        <!--          {{ formatMoney(props.item.return, { precision: 2 }) }}-->
        <!--        </td>-->
      </tr>
    </template>
    <template v-slot:footer>
      <td :colspan="headers.length" class="text-xs-center py-2">
        <strong
          ><span style="padding-right: 40px;">Hit Frequency:</span>
          {{
            formatMoney(payoutTable.hitFrequency * 100, {
              symbol: "%",
              precision: 2,
              format: {
                zero: "%v%s",
                pos: "%v%s",
                neg: "(%v%s)"
              }
            })
          }}</strong
        >
        <br />
        <strong
          ><span style="padding-right: 5px;">Payback Percentage:</span>
          {{
            formatMoney(payoutTable.paybackPercentage * 100, {
              symbol: "%",
              precision: 2,
              format: {
                zero: "%v%s",
                pos: "%v%s",
                neg: "(%v%s)"
              }
            })
          }}</strong
        >
      </td>
    </template>
  </v-data-table>
</template>

<script>
import _ from "lodash";
import { mapState, mapMutations, mapActions } from "vuex";
import formatMoney from "accounting-js/lib/formatMoney";

export default {
  name: "PayoutTable",
  components: {},
  props: {
    payoutTable: {
      type: Object
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Spots Marked",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Hits",
          align: "right",
          sortable: false,
          value: "hits"
        },
        {
          text: "Pays",
          align: "right",
          sortable: false,
          value: "pays"
        }
        // {
        //   text: "Combinations",
        //   align: "right",
        //   sortable: false,
        //   value: "combinations"
        // },
        // {
        //   text: "Return",
        //   align: "right",
        //   sortable: false,
        //   value: "return"
        // }
      ],
      pagination: {
        rowsPerPage: -1
      }
    };
  },
  computed: {
    // ...mapState({
    //   example: state => state.example,
    // }),
    // example: function() {return {}}
  },
  watch: {
    // comps: function () {}
  },
  methods: {
    formatMoney
    // ...mapMutations({
    //   example: "example/example",
    // }),
    // ...mapActions({
    //   setField: "example/example",
    // }),
    // example() {}
  }
};
</script>

<style scoped></style>
