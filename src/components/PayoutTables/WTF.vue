<template>
  <v-container class="pa-0">
    <Toolbar back-path="/"></Toolbar>
    <v-content>
      <v-container fluid grid-list-lg>
        <v-layout row wrap> </v-layout>
      </v-container>
    </v-content>
  </v-container>
</template>

<script>
import _ from "lodash";
import { mapState, mapMutations, mapActions } from "vuex";
import Toolbar from "../Toolbar";
export default {
  name: "WTF",
  components: {
    Toolbar
  },
  data() {}
};
</script>

<style scoped></style>
