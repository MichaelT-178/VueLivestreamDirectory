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
    class="lucide lucide-globe-icon lucide-globe"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
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
