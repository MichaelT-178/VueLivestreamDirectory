<template>
  <component
    :is="linkTag"
    v-bind="linkProps"
    class="home-card"
    style="background-color: #1E293B; padding: 1rem; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"
  >
    <div class="icon-background" :style="backgroundStyle">
      <component
        :is="IconComponent"
        :stroke-color="card.iconColorCode"
        :width="30"
      />
    </div>

    <h2 style="color: white; font-size: 1.25rem; font-weight: bold;">
      {{ card.title }}
    </h2>

    <p style="color: #ccc;">
      {{ card.description || 'CHANGE THIS' }}
    </p>

    <p
      class="link-with-icon"
      :style="{ color: card.iconColorCode || '#aaa' }"
    >
      {{ card.linkTitle || 'CHANGE LINK' }}
      <component
        v-if="ArrowIcon"
        :is="ArrowIcon"
        :stroke-color="card.iconColorCode"
        :width="18"
        style="margin-left: 0.25rem;"
      />
    </p>
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

const backgroundStyle = computed(() => {
  const color = props.card.iconColorCode || '#000000';
  return {
    backgroundColor: hexToRgba(color, 0.3)
  };
});

const isExternalLink = computed(() => {
  return (
    typeof props.card.route === 'string' && props.card.route.startsWith('http')
  );
});

const isInternalLink = computed(() => {
  return (
    typeof props.card.route === 'string' && props.card.route.startsWith('/')
  );
});

const linkTag = computed(() => {
  if (isInternalLink.value) return 'router-link';
  if (isExternalLink.value) return 'a';
  return 'div';
});

const linkProps = computed(() => {
  if (isInternalLink.value) {
    return { to: props.card.route };
  } else if (isExternalLink.value) {
    return {
      href: props.card.route,
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
  transition: transform 0.2s;
}
.home-card:hover {
  transform: scale(1.03);
}

.link-with-icon {
  display: flex;
  font-weight: 500;
  /* font-family: Inter, "Inter Fallback", sans-serif; */
  font-size: 16px;
  align-items: center;
}

.icon-background {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

</style>
