<template>
  <div class="mobile-search-view">
    <button class="close-button" @click="emit('close')">×</button>
    <div>MOBILE SEARCH VIEW</div>
  </div>
</template>


<script setup>
import { watch } from 'vue';
import { useScreenHelpers } from '../composables/useScreenHelpers.js';

const emit = defineEmits(['close']);
const { isSmallScreen } = useScreenHelpers(400);

watch(isSmallScreen, (value) => {
  if (!value) {
    emit('close');
  }
});

</script>


<style scoped>
.mobile-search-view {
  padding: 1rem;
  background-color: #0f172a;
  color: white;
  height: 100%;
  width: 100%;
}

.close-button {
  cursor: pointer;
}

</style>
