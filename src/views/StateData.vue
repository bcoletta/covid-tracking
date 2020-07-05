<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col class="d-flex" cols="5" md="3">
          <StateDropdown v-model="state" />
        </v-col>
        <v-col class="d-flex" cols="2" md="6"></v-col>
        <v-col class="d-flex" cols="5" md="3">
          <TimePeriodSelect />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <DailyCases v-if="showDailyCases" :dailyCases="dailyCases" :category="category" />
          <Loading v-if="loading" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import API from '@/services/api-service';
import StateList from '@/assets/state-list.json';
import DailyCases from './DailyCases';
import StateDropdown from '@/components/StateDropdown';
import Loading from '@/components/Loading';
import TimePeriodSelect from '@/components/TimePeriodSelect';


export default {
  name: 'StateData',
  components: {
    DailyCases,
    StateDropdown,
    Loading,
    TimePeriodSelect,
  },
  data() {
    return {
      dailyCases: [],
      state: this.$route.params.state,
      loading: false,
    };
  },
  computed: {
    showDailyCases() {
      return this.state && !this.loading;
    },
    category() {
      return StateList.states.find(state => state.value === this.state).text;
    },
  },
  methods: {
    getData() {
      this.loading = true;
      API.getDailyCasesByState(this.state).then(res => {
        this.dailyCases = res;
        this.loading = false;
      });
    },
  },
  mounted() {
    if (this.state) {
      this.getData();
    }
  },
  watch: {
    '$route.params'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getData();
      }
    },
    state(state) {
      this.$router.push(`/state/${state}`);
    },
  },
};
</script>
