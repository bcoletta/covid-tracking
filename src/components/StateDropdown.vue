<template>
  <v-autocomplete
    :value="value"
    :items="items"
    label="Choose a State"
    @change="updateState"
    auto-select-first
    outlined
    dense
  ></v-autocomplete>
</template>

<script>
import StateList from '@/assets/state-list.json';

export default {
  name: 'StateDropdown',
  props: [ 'value' ],
  computed: {
    items() {
      return StateList.states || [];
    },
  },
  methods: {
    updateState(event) {
      this.$emit('input', event);
    },
  },
};
</script>
