<template>
  <v-app>
    <v-app-bar dark dense :max-height="96">
      <v-toolbar-title to="/" title="COVID Positivity Rates">COVID-19 Positivity Rates</v-toolbar-title>
      <v-spacer />
      <template v-slot:extension>
        <v-tabs>
          <v-tab to="/">US</v-tab>
          <v-tab to="/state">State</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer><v-spacer /> <div>Built with data from <a href="https://www.covidtracking.com">covidtracking.com</a></div></v-footer>
  </v-app>
</template>

<style lang="less" scoped>
a {
  margin-left: 5px;
}
</style>
