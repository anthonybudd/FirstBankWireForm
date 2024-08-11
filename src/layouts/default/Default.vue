<template>
  <v-app>
    <notifications />
    <AppBar />
    <DefaultView />
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import AppBar from './AppBar.vue';
import DefaultView from './View.vue';
import emitter from 'tiny-emitter/instance';

const isChangingGroup = ref(false);

emitter.on('onChangeGroup', async () => {
  isChangingGroup.value = true;
  await new Promise(r => setTimeout(r, 1000)); // AB: This for UX
  isChangingGroup.value = false;
});
</script>
