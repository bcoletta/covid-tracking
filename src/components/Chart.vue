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
            borderColor: 'rgba(0, 0, 255, 0.5)',
            lineTension: 0,
            fill: false,
            data: this.dataset.map(item => item.positivityRate),
          },
          {
            label: 'DPR Target',
            borderColor: 'rgba(0, 0, 255, 0.3)',
            fill: false,
            data: this.dataset.map(() => 5),
            borderDash: [ 15 ],
            pointRadius: 0,
          },
          {
            label: 'Daily Cases',
            backgroundColor: this.dataset.map(item => item.color),
            yAxisID: 'tests',
            data: this.dataset.map(item => item.positiveIncrease),
            type: 'bar',
            stacked: true,
            stack: 'tests',
          },
          {
            label: 'Daily Tests',
            yAxisID: 'tests',
            data: this.dataset.map(item => item.totalTestResultsIncrease),
            type: 'bar',
            stacked: true,
            stack: 'tests',
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
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              id: 'percent',
              type: 'linear',
              position: 'left',
              gridLines: {
                display: false,
              },
              ticks: {
                min: 0,
                max: this.category === 'US' ? 50 : 100,
              },
            },
            {
              id: 'tests',
              type: 'linear',
              position: 'right',
              ticks: {
                min: 0,
                maxTicksLimit: 11,
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
