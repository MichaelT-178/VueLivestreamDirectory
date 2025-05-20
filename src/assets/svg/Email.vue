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
    class="lucide lucide-mail-icon lucide-mail"
  >
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
    <rect x="2" y="4" width="20" height="16" rx="2" />
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
