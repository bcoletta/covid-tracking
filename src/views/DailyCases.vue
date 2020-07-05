<template>
  <div>
    <div class="chart-wrapper">
      <Chart :data="dailyCases" :category="category" />
      <v-subheader>*Daily cases are colored based on whether or not they met the target Daily Positivity Rate</v-subheader>
    </div>
    <Table :data="dailyCases" />
  </div>
</template>

<script>
import Table from '@/components/Table';
import Chart from '@/components/Chart';

export default {
  name: 'CaseData',
  props: [ 'dailyCases', 'category' ],
  components: {
    Table,
    Chart,
  },
};
</script>

<style lang="less" scoped>
.chart-wrapper {
  max-height: 50vh;
  margin-bottom: 20px;
  h6 {
    float: right;
  }
}
</style>
