<template>
  <component
    :is="linkTag"
    :to="isInternalLink ? card.route : undefined"
    :href="isExternalLink ? card.route : undefined"
    target="_blank"
    rel="noopener noreferrer"
    class="home-card"
    style="background-color: #1E293B; padding: 1rem; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"
  >
    <component
      :is="IconComponent"
      :stroke-color="card.iconColor"
      :width="40"
    />
    <h2 style="color: white; font-size: 1.25rem; font-weight: bold;">
      {{ card.title }}
    </h2>
    <p style="color: #ccc;">{{ card.description || 'CHANGE THIS' }}</p>
    <p style="color: #aaa; font-style: italic;">{{ card.linkTitle || 'CHANGE LINK' }}</p>
  </component>
</template>


<script setup>
import { computed } from 'vue';
import iconMap from '../assets/svg/IconMap.js';

const props = defineProps({
  card: {
    type: Object,
    required: true,
  }
});

const isExternalLink = computed(() => {
  return typeof props.card.route === 'string' && props.card.route.startsWith('http');
});

const isInternalLink = computed(() => {
  return typeof props.card.route === 'string' && props.card.route.startsWith('/');
});

const linkTag = computed(() => {
  if (isInternalLink.value) return 'router-link';
  if (isExternalLink.value) return 'a';
  return 'div';
});

const IconComponent = computed(() => {
  return iconMap[props.card.icon?.toLowerCase()] || null;
});

</script>



<style scoped>
.home-card {
  transition: transform 0.2s;
}
.home-card:hover {
  transform: scale(1.03);
}

/* 94A3B8 -> Description Color */
/* rgb(20 83 45 / .3) -> Circle opacity */

</style>
