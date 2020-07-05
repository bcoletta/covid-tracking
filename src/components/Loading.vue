<template>
  <v-container fluid>
    <v-skeleton-loader class="mx-auto" type="text"></v-skeleton-loader>
    <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
    <v-skeleton-loader class="mx-auto" type="text"></v-skeleton-loader>
    <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
  </v-container>
</template>

<script>
export default {
  name: 'Loading',
};
</script>
