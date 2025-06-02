<template>
  <div class="error-card">
    <div class="icon-background">
      <component :is="IconComponent" stroke-color="#FB7185" :width="32" />
    </div>

    <h1 class="error-title">{{ title }}</h1>
    <p class="error-description">{{ description }}</p>

    <!-- Router link if no http else regular link -->
    <router-link
      v-if="!isExternal"
      :to="link"
      class="link-with-icon"
    >
      {{ linkTitle }}
      <component :is="ArrowIcon" stroke-color="#FB7185" :width="20" class="arrow-icon" />
    </router-link>
    <a
      v-else
      :href="link"
      class="link-with-icon"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ linkTitle }}
      <component :is="ArrowIcon" stroke-color="#FB7185" :width="20" class="arrow-icon" />
    </a>


  </div>
</template>



<script setup>
import { computed } from 'vue';
import iconMap from '../assets/svg/IconMap.js';

const props = defineProps({
  title: {
    type: String,
    default: '404 - Page Not Found'
  },
  description: {
    type: String,
    default: 'Sorry, the page you are looking for does not exist.'
  },
  link: {
    type: String,
    default: '/'
  },
  linkTitle: {
    type: String,
    default: 'Go back home'
  }
});

const IconComponent = iconMap['trianglealert'];
const ArrowIcon = iconMap['arrowright'];

const isExternal = computed(() => props.link.startsWith('http'));

</script>


<style scoped>
.error-card {
  background-color: #1E293B;
  padding: 23px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  margin: 60px auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.icon-background {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(251, 113, 133, 0.3);
}

.error-title {
  font-size: 1.75rem;
  color: white;
  font-weight: bold;
  margin: 0;
}

.error-description {
  color: #94A3B8;
  margin: 0;
  font-size: 18px;
}

.link-with-icon {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  margin-top: 4px;
  cursor: pointer;
  color: #FB7185;
}

.link-with-icon:hover {
  filter: brightness(0.85);
}

.arrow-icon {
  margin-left: 0.25rem;
}

@media (max-width: 500px) {
  .error-card {
    max-width: 280px;
  }
}

@media (max-width: 350px) {
  .error-card {
    max-width: 220px;
  }
}

</style>
