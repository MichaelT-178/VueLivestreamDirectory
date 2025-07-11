<template>
  <div class="home-card">
    <div class="icon-background" :style="backgroundStyle">
      <component
        :is="IconComponent"
        :stroke-color="cardColor"
        :width="28"
      />
    </div>

    <h2
      class="card-title"
      :style="isDark ? { color: cardColor } : undefined"
    >
      {{ card.title }}
    </h2>


    <p class="card-description">{{ card.description }}</p>

    <component
      :is="linkTag"
      v-bind="linkProps"
      class="link-with-icon"
      :style="{ color: cardColor }"
      v-if="linkTag !== 'div'"
    >
      {{ card.linkTitle }}
      <component
        v-if="ArrowIcon"
        :is="ArrowIcon"
        :stroke-color="cardColor"
        :width="20"
        class="arrow-icon"
      />
    </component>

    <p
      v-else
      class="link-with-icon"
      :style="{ color: colorCode }"
    >
      {{ card.linkTitle }}
      <component
        v-if="ArrowIcon"
        :is="ArrowIcon"
        :stroke-color="colorCode"
        :width="20"
        class="arrow-icon"
      />
    </p>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import iconMap from '../assets/svg/IconMap.js';
import ColorGraph from '../assets/Home/ColorGraph.json';
import DarkColorGraph from '../assets/Home/DarkColorGraph.json';
import { useDark } from '@vueuse/core';

const isDark = useDark();

const props = defineProps({
  card: {
    type: Object,
    required: true,
  }
});

function hexToRgba(hex, alpha = 1) {
  let hexValue = hex.replace('#', '');

  if (hexValue.length === 3) {
    hexValue = hexValue.split('').map(c => c + c).join('');
  }

  const bigint = parseInt(hexValue, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const cardColor = computed(() => {
  const colorKey = props.card.iconColor?.toLowerCase();
  const colorMap = isDark.value ? DarkColorGraph : ColorGraph;

  return colorMap[colorKey]?.code || '#000000';
});

const backgroundStyle = computed(() => ({
  backgroundColor: hexToRgba(cardColor.value, 0.3)
}));

// const backgroundStyle = computed(() => {
//   const color = props.card.iconColorCode || '#000000';
  
//   return {
//     backgroundColor: hexToRgba(color, 0.3)
//   };
// });

const linkTag = computed(() => {
  if (props.card.linkType === 'router') return 'router-link';
  if (props.card.linkType === 'external') return 'a';
  return 'div';
});

const linkProps = computed(() => {
  
  if (isInternalLink.value) {
    return { 
      to: props.card.route 
    };

  } else if (isExternalLink.value) {
    return {
      href: props.card.route,
      target: '_blank',
      rel: 'noopener noreferrer',
    };

  } else {
    return {};
  }

});

const IconComponent = computed(() => {
  return iconMap[props.card.icon?.toLowerCase()] || null;
});

const ArrowIcon = computed(() => iconMap['arrowright']);

</script>


<style scoped>
.home-card {
  background-color: #1E293B;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  width: 320px;
  min-height: 202px;
  transition: transform 0.2s;
  text-decoration: none;
}

.dark .home-card {
  background-color: white;
  background-color: #eef5fd;
  border: 1px solid #cbd5e1;
}

.dark .card-title {
  color: red;
}

.icon-background {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
}

.card-title {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  margin-top: 5px;
}

.card-description {
  color: #94A3B8;
  margin: 0;
  font-size: 1.1rem;
}

.link-with-icon {
  display: flex;
  font-weight: 500;
  font-size: 16.5px;
  align-items: center;
  margin-top: 10px;
  text-decoration: none;
  cursor: pointer;
}

.link-with-icon:hover {
  filter: brightness(0.85);
}

.arrow-icon {
  margin-left: 0.25rem;
}

@media (max-width: 400px) {
  .icon-background {
    width: 45px;
    height: 45px;
  }

  .home-card {
    width: 300px;
  }
}

</style>
