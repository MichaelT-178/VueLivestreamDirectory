<template>
  <a
    :href="lesson.link"
    class="lesson-card"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      :src="imageSrc"
      :alt="lesson.title"
      class="thumbnail-image"
    />

    <div class="lesson-info">
      <h2 class="song-title">{{ lesson.title }}</h2>
      <p><strong>Artist:</strong> {{ lesson.artist }}</p>
      <p><strong>Tuning:</strong> {{ lesson.tuning }}</p>
      <p><strong>Date:</strong> {{ lesson.date }}</p>
    </div>
  </a>
</template>


<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  lesson: Object
});

const imageSrc = ref('');

watchEffect(() => {
  imageSrc.value = new URL(`../assets/lesson-thumbnails/${props.lesson.thumbnail}`, import.meta.url).href;
});

</script>


<style scoped>
.lesson-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 400px;
  background-color: #1f2937;
  color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.dark .lesson-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.0);
}

.dark .lesson-card {
  background-color:#9333ea;
  color: white;
}

.dark .song-title {
  color: white;
}

.dark .lesson-card:hover .song-title {
  color: #dfdfdf;
  text-decoration: underline;
}

.thumbnail-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.lesson-info {
  padding: 0.25rem 1rem 0.5rem 1rem;
  flex-grow: 1;
}

.song-title {
  cursor: pointer;
  color: #C084FC;
  font-size: 20px;
  margin-bottom: 0.5rem;
  transition: text-decoration 0.2s ease;
}

.lesson-card:hover .song-title {
  text-decoration: underline;
}

@media (max-width: 400px) {
  .lesson-card {
    min-height: 0px;
  }

  .thumbnail-image {
    height: 150px;
  }

}

</style>
