import API from '@/services/api-service'

const state = {
  dailyCases: [],
};

const getters = {};

const mutations = {
  setDailyCases(state, cases) {
    state.dailyCases = cases;
  },
};

const actions = {
  getDailyCasesByState({ state, commit }, state) {
    return API.getDailyCasesByState(state).then(res => ( commit('setDailyCases', res)));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};