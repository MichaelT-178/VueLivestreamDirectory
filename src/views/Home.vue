<template>
  <div class="page-container">
    <div class="top-bar">
      <div class="top-bar-inner">
        <h1 class="site-title">Livestream Directory</h1>
        <div class="nav-links">
          <a href="https://www.youtube.com/@coreyheuvel" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://coreyheuvel.com/" target="_blank" rel="noopener noreferrer">Website</a>
          <a href="/contact" target="_blank">Contact</a>
        </div>
      </div>
    </div>

    <div class="centered">
      <p class="title">
        <font-awesome-icon icon="guitar" />
        Corey Heuvel <span class="search-word">Search</span>
      </p>
      
      <div class="search-wrapper">
        <SearchBar />
      </div>

      <HomeCard
        name="Lessons"
        route="/patreon-sign-in"
        color="gray"
      />
    </div>
  </div>
</template>


<script setup>
import SearchBar from '../components/SearchBar.vue';
import HomeCard from '../components/HomeCard.vue';

</script>


<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.top-bar {
  width: 100%;
  border-bottom: 0.5px solid #cbd5e1;
  background-color: transparent;
}

.top-bar-inner {
  margin: 0 auto;
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.site-title {
  font-size: 1.3rem;
  margin: 0;
}

.search-word {
  color: #60A5FA;
}

.nav-links a {
  color:#cbd5e1;
  text-decoration: none;
  margin-left: 1.5rem;
  font-weight: bold;
}

.nav-links a:hover {
  text-decoration: underline;
}

.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
}

.title {
  font-size: 2.5rem;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-wrapper {
  width: 100%;
  display: flex;
  margin-top: -20px;
  justify-content: center;
}

@media (max-width: 750px) {
  .nav-links a {
    color:red;
  }
}


@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }

  .nav-links a {
    margin-left: 1rem;
  }
}

@media (max-width: 400px) {
  .title {
    font-size: 1.75rem;
  }

  .site-title {
    font-size: 1.25rem;
  }
}

</style>
