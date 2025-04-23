<template>
  <div class="centered">
    <p class="title">
      <font-awesome-icon icon="guitar" />
      <a 
        href="https://www.youtube.com/@coreyheuvel" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="channel-link"
      >
        Corey Heuvel Search
      </a>
    </p>
    <SearchBar />
  </div>
</template>


<script setup>
import SearchBar from '../components/SearchBar.vue';
</script>


<style scoped>
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2a9fd6;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.channel-link {
  color: #2a9fd6;
  text-decoration: none;
}

.channel-link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }
}

@media (max-width: 400px) {
  .title {
    font-size: 1.75rem;
  }
}

</style>
