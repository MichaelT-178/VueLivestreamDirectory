<template>
  <div class="page-container">
    <div class="top-bar">
      <div class="top-bar-inner">

        <img :src="CHLogo" class="ch-logo" alt="CH Logo" />

        <h1 class="site-title">Livestream Directory</h1>

        <div class="nav-links desktop-only">
          <a href="https://www.youtube.com/@coreyheuvel" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://coreyheuvel.com/" target="_blank" rel="noopener noreferrer">Website</a>
          <router-link to="/contact">Contact</router-link>
        </div>

        <div class="mobile-only">
          <font-awesome-icon icon="bars" @click="toggleMobileMenu" class="hamburger-icon" />
        </div>

      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <a href="https://www.youtube.com/@coreyheuvel" target="_blank" rel="noopener noreferrer">YouTube</a>
      <a href="https://coreyheuvel.com/" target="_blank" rel="noopener noreferrer">Website</a>
      <router-link to="/contact">Contact</router-link>
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
import { ref } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import HomeCard from '../components/HomeCard.vue';
import CHLogo from '../../ch-logo.jpg';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

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
  margin: 0 0rem;
  white-space: nowrap;
}

.ch-logo {
  display: none;
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
}

.search-word {
  color: #60A5FA;
}

.nav-links a,
.mobile-menu a {
  color: #cbd5e1;
  text-decoration: none;
  margin-left: 1.5rem;
  font-weight: bold;
}

.nav-links a:hover,
.mobile-menu a:hover {
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

.hamburger-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #1f2937;
}

.mobile-menu a {
  margin: 0.5rem 0;
}

.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

@media (max-width: 750px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: flex;
  }

  .top-bar-inner {
    padding: 1rem 1rem;
  }

  .site-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }

  .site-title {
    font-size: 1.25rem;
  }

  .nav-links a {
    margin-left: 1rem;
  }
}

@media (max-width: 400px) {
  .ch-logo {
    display: block;
  }

  .site-title {
    display: none;
  }

  .title {
    margin-top: 18px;
    font-size: 1.75rem;
  }
}

</style>
