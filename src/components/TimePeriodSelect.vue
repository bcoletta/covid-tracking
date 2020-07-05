<template>
  <v-select
    :value="value"
    :items="items"
    label="Time Period"
    @change="updateTimePeriod"
    outlined
    dense
  ></v-select>
</template>

<script>
export default {
  name: 'TimePeriodSelect',
  data() {
    return {
      items: [
        { text: 'All Time', value: 0 },
        { text: 'Last 14 Days', value: 14 },
        { text: 'Last 30 Days', value: 30 },
        { text: 'Last 90 Days', value: 90 },
      ],
    };
  },
  computed: {
    value() {
      return this.$route.query.t ? parseInt(this.$route.query.t) : 0;
    },
  },
  methods: {
    updateTimePeriod(val) {
      let query = { ...this.$route.query };
      if (val === query.t) {
        return;
      }
      if (val) {
        query.t = val;
      } else {
        delete query.t;
      }
      this.$router.push({ query });
    },
  },
};
</script>
