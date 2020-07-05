<template>
  <v-data-table class="success-text" :headers="headers" :items="cases" :itemsPerPage="30">
    <template v-slot:item.positivityRate="{ item }">
      <v-chip :color="getColor(item.positivityRate)" dark>{{ item.positivityRate }}</v-chip>
    </template>
  </v-data-table>
</template>

<script>
import ApiService from '@/services/api-service';
import moment from 'moment';

export default {
  name: 'Table',
  props: [ 'data' ],
  data() {
    return {
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Total Tests', value: 'total' },
        { text: 'New Tests', value: 'newCases' },
        { text: 'New Positive Cases', value: 'newPositive' },
        { text: 'Positivity Rate', value: 'positivityRate' },
      ],
      cases: [],
    };
  },
  methods: {
    getDate(date) {
      return moment(date).format('MM/DD/YYYY');
    },
    getPositivityRate(day) {
      return (
        (day.positiveIncrease / day.totalTestResultsIncrease) *
        100
      ).toFixed(2);
    },
    formatNumber(x) {
      if (!x) { return 0 }
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    mapData() {
      if (this.data) {
        this.cases = this.data.map(day => {
          return {
            date: this.getDate(day.dateChecked),
            newCases: this.formatNumber(day.totalTestResultsIncrease),
            newPositive: this.formatNumber(day.positiveIncrease),
            positivityRate: this.getPositivityRate(day),
            total: this.formatNumber(day.total),
          };
        });
      }
    },
    getColor(rate) {
      if (rate < 5) {
        return 'green';
      }
      return 'red';
    },
  },
  mounted() {
    this.mapData();
  },
  watch: {
    data() {
      this.mapData();
    },
  },
};
</script>
