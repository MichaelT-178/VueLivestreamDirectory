<template>
  <div class="header-with-icon">
    <router-link :to="leadingIconRoute" custom v-slot="{ href, navigate }">
      <div
        :href="href"
        @click="navigate"
        class="icon-background home-icon-link"
        :style="leadingIconBackground"
      >
        <component
          :is="leadingIconComponent"
          :stroke-color="resolveColor(leadingIconColor)"
          :width="28"
          class="header-icon"
        />
      </div>
    </router-link>

    <component
      :is="iconMap['doublechevronright']"
      :stroke-color="resolveColor('white')"
      :width="29"
      class="header-icon"
    />

    <div class="icon-background" :style="backgroundStyle">
      <component
        :is="iconComponent"
        :stroke-color="resolveColor(iconColor)"
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
import ColorGraph from '../assets/Home/ColorGraph.json';
import DarkColorGraph from '../assets/Home/DarkColorGraph.json';
import { useDark } from '@vueuse/core';

const isDark = useDark();

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
    default: 'white'
  },
  leadingIcon: {
    type: String,
    default: 'home'
  },
  leadingIconColor: {
    type: String,
    default: 'sky'
  },
  leadingIconRoute: {
    type: String,
    default: '/'
  }
});

const iconComponent = computed(() => iconMap[props.icon?.toLowerCase()] || null);
const leadingIconComponent = computed(() => iconMap[props.leadingIcon?.toLowerCase()] || null);

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

const resolveColor = (name) => {
  if (!name) {
    return '#000000';
  }

  const graph = isDark.value ? DarkColorGraph : ColorGraph;

  if (name.toLowerCase() === 'white') {
    return isDark.value ? '#cbd5e1' : '#ffffff';
  }

  return graph[name.toLowerCase()]?.code || name;
};


const backgroundStyle = computed(() => ({
  backgroundColor: hexToRgba(resolveColor(props.iconColor), 0.3)
}));

const leadingIconBackground = computed(() => ({
  backgroundColor: hexToRgba(resolveColor(props.leadingIconColor), 0.2)
}));

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
  flex-shrink: 0;
}

.home-icon-link:hover {
  opacity: 0.7;
  cursor: pointer;
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

.dark .header-title {
  color: #cbd5e1;
}

@media (max-width: 400px) {
  .header-with-icon {
    display: none;
  }
}

</style>
