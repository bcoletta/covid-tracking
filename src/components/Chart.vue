<script>
import { Line } from 'vue-chartjs';
import moment from 'moment';

export default {
  name: 'Chart',
  extends: Line,
  props: [ 'data', 'category' ],
  data() {
    return {
      displayData: [],
    };
  },
  computed: {
    dataset() {
      return [ ...this.data ]
        .filter(
          item =>
            item.totalTestResultsIncrease &&
            item.totalTestResultsIncrease !== 0 &&
            moment(item.dateChecked).isAfter(this.lastDate),
        )
        .reverse();
    },
    dayNum() {
      return this.$route.query.t ? parseInt(this.$route.query.t) : 0;
    },
    lastDate() {
      return this.dayNum ? moment().subtract(this.dayNum, 'days') : moment(0);
    },
  },
  methods: {
    setupTable() {
      let displayData = {
        labels: this.dataset.map(item =>
          moment(item.dateChecked).format('MM/DD'),
        ),
        datasets: [
          {
            label: 'Daily Positivity Rate',
            borderColor: '#f00',
            lineTension: 0,
            fill: false,
            data: this.dataset.map(item => item.positivityRate),
          },
          {
            label: '14 Day Average',
            borderColor: '#000',
            fill: false,
            data: this.dataset.map(item => item.avg14Days),
          },
          {
            label: '5 Day Average',
            borderColor: '#888',
            fill: false,
            data: this.dataset.map(item => item.avg5Days),
          },
          {
            label: 'Target line',
            borderColor: 'rgba(0, 0, 255, 0.3)',
            fill: false,
            data: this.dataset.map(() => 5),
            borderDash: [ 15 ],
            pointRadius: 0,
          },
          {
            label: 'New Tests',
            yAxisID: 'tests',
            borderColor: '#888',
            data: this.dataset.map(item => item.totalTestResultsIncrease),
            type: 'bar',
          },
        ],
      };

      this.renderChart(displayData, {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
        },
        title: {
          text: `Positivity Rate for ${this.category}`,
          display: true,
          fontSize: 16,
          lineHeight: 2,
        },
        scales: {
          yAxes: [
            {
              id: 'percent',
              type: 'linear',
              position: 'left',
              ticks: {
                min: 0,
              },
            },
            {
              id: 'tests',
              type: 'linear',
              position: 'right',
              ticks: {
                min: 0,
              },
            },
          ],
        },
      });
    },
  },
  mounted() {
    this.setupTable();
  },
  watch: {
    data() {
      this.setupTable();
    },
    dataset() {
      this.setupTable();
    },
  },
};
</script>
