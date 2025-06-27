<template>
  <div class="modal-card">
    <div class="icon-wrapper">
      <component :is="config.icon" :stroke-color="config.color" :width="100" />
    </div>

    <h1 class="modal-title">{{ config.title }}</h1>
    <p class="modal-description">{{ config.description }}</p>

    <button class="ok-button" @click="$emit('close')">Ok</button>
  </div>
</template>


<script setup>
import iconMap from '../assets/svg/IconMap.js';
import { computed } from 'vue';

const props = defineProps({
  success: {
    type: Boolean,
    default: false
  }
});

const config = computed(() => {
  return props.success
    ? {
        icon: iconMap['circlecheck'],
        title: 'Sent!',
        description: 'Your message has been sent successfully!',
        color: '#4ade80'
      }
    : {
        icon: iconMap['circlex'],
        title: 'Error!',
        description: 'Something went wrong when sending your message! See console.',
        color: '#f87171'
      };
});

</script>


<style scoped>
.modal-card {
  background-color: #1e293b;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  margin: 60px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  color: white;
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0;
}

.modal-description {
  font-size: 1.3rem;
  color: #94a3b8;
  margin: 0;
}

.ok-button {
  margin-top: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: #7066e0;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.ok-button:hover {
  background-color: #5750ad
}

@media (max-width: 400px) {
  .modal-card {
    max-width: 80%;
    padding: 1.5rem;
  }
}

</style>
