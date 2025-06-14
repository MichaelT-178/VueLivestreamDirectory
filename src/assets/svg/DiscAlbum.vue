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
    class="lucide lucide-disc-album-icon lucide-disc-album"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <circle cx="12" cy="12" r="5" />
    <path d="M12 12h.01" />
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
