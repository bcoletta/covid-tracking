<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="9"></v-col>
        <v-col class="d-flex" cols="6" md="3">
          <TimePeriodSelect />
        </v-col>
      </v-row>
      <v-row>
        <v-col rows="12">
          <DailyCases v-if="!loading" :dailyCases="dailyCases" category="US" />
          <Loading v-else />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import API from '@/services/api-service';
import DailyCases from './DailyCases';
import Loading from '@/components/Loading';
import TimePeriodSelect from '@/components/TimePeriodSelect';

export default {
  name: 'USData',
  components: {
    DailyCases,
    Loading,
    TimePeriodSelect,
  },
  data() {
    return {
      dailyCases: [],
      loading: true,
    };
  },
  mounted() {
    API.getDailyCasesUS(this.state).then(res => {
      this.dailyCases = res;
      this.loading = false;
    });
  },
};
</script>
