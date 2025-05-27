<template>
  <div class="header-with-icon">
    <!-- Home icon -->
    <router-link to="/" class="icon-background" :style="homeIconBackground">
      <component
        :is="iconMap['home']"
        :stroke-color="homeButtonColor"
        :width="28"
        class="header-icon home-icon-link"
      />
    </router-link>

    <!-- Arrow icon -->
    <component
      :is="iconMap['doublechevronright']"
      stroke-color="#ffffff"
      :width="29"
      class="header-icon"
    />

    <!-- Main icon -->
    <div class="icon-background" :style="backgroundStyle">
      <component
        :is="iconComponent"
        :stroke-color="iconColor"
        :width="28"
        class="header-icon"
      />
    </div>

    <h2 class="header-title">{{ title }}</h2>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import iconMap from '../assets/svg/IconMap.js';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  iconColor: {
    type: String,
    default: '#ffffff'
  }
});

const homeButtonColor = '#38bdf8';

const iconComponent = computed(() => {
  return iconMap[props.icon?.toLowerCase()] || null;
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
  const color = props.iconColor || '#000000';
  return { backgroundColor: hexToRgba(color, 0.3) };
});

const homeIconBackground = computed(() => {
  return { backgroundColor: hexToRgba(homeButtonColor, 0.2) };
});

</script>



<style scoped>
.header-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-background {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-icon-link:hover {
  opacity: 0.7;
}

.header-icon {
  display: block;
}

.header-title {
  color: white;
  font-size: 26px;
  font-weight: 600;
  margin-left: 9px;
}

@media (max-width: 400px) {
  .header-with-icon {
    display: none;
  }
}

</style>
