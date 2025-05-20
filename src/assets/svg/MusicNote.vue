<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="width"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="strokeColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-music-icon lucide-music"
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
</template>

<script setup>
defineProps({
  width: {
    type: [String, Number],
    default: 24
  },
  strokeColor: {
    type: String,
    default: "currentColor"
  }
});
</script>
