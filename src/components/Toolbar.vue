<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase" v-on:click="goHome" style="cursor: pointer">
      <v-btn v-if="showBackButton" v-on:click.stop="goBack" icon class="hidden-xs-only">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <span>Guerilla </span>
      <span class="font-weight-light">KENO</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="'/payout-tables'">Payout Tables</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    backPath: {
      type: String,
      default: ""
    }
  },
  computed: {
    showBackButton() {
      return this.backPath !== "";
    }
  },
  methods: {
    goBack() {
      this.$router.push(this.backPath);
    },
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped></style>
