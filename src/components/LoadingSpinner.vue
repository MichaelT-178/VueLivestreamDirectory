<template>
  <div v-if="loading" class="overlay">
    <div class="spinner"></div>
  </div>
</template>


<script setup>
defineProps({
  loading: {
    type: Boolean,
    required: true
  }
})
</script>


<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(30, 41, 59, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 6px solid transparent;
  /* border: 5px solid #ccc; */
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>
