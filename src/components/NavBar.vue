<template>
  <div>
    <div class="top-bar">
      <div class="top-bar-inner">

        <!-- Livestream directory and CH logo -->
        <router-link to="/" custom v-slot="{ navigate, href }">
          <div
            class="home-router-btn"
            :href="href"
            @click="navigate"
          >
            <img :src="CHLogo" class="ch-logo" alt="CH Logo" />
            <h1 class="site-title">Livestream Directory</h1>
          </div>
        </router-link>

        <div class="nav-links desktop-only">
          <div class="nav-items">
            <a href="https://www.youtube.com/@coreyheuvel" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://coreyheuvel.com/" target="_blank" rel="noopener noreferrer">Website</a>
            <a href="https://www.patreon.com/coreyheuvel" target="_blank" rel="noopener noreferrer">Patreon</a>
            <a href="http://paypal.me/coreyheuvel" target="_blank" rel="noopener noreferrer">PayPal</a>
          </div>
          <component
            :is="!isDark ? iconMap['toggleright'] : iconMap['toggleleft']"
            class="toggle-btn"
            @click="toggleDark()"
          />
        </div>

        <!-- Hamburger menu icon for mobile -->
        <div class="mobile-only">
          <font-awesome-icon
            icon="bars"
            @click="toggleMobileMenu"
            class="hamburger-icon"
          />
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <router-link 
        to="/" 
        @click="closeMobileMenu"
      >Home</router-link>
      <a
        href="https://www.youtube.com/@coreyheuvel"
        target="_blank"
        rel="noopener noreferrer"
        @click="closeMobileMenu"
      >YouTube</a>
      <a
        href="https://coreyheuvel.com/"
        target="_blank"
        rel="noopener noreferrer"
        @click="closeMobileMenu"
      >Website</a>
      <a
        href="https://www.patreon.com/coreyheuvel"
        target="_blank"
        rel="noopener noreferrer"
        @click="closeMobileMenu"
      >Patreon</a>
      <a
        href="http://paypal.me/coreyheuvel"
        target="_blank"
        rel="noopener noreferrer"
        @click="closeMobileMenu"
      >PayPal</a>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import CHLogo from '../../ch-logo.jpg';
import iconMap from '../assets/svg/IconMap';
import { useDark, useToggle } from "@vueuse/core";

const isMobileMenuOpen = ref(false);
const isDark = useDark();
const toggleDark = useToggle(isDark);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleResize = () => {
  if (window.innerWidth >= 750) {
    isMobileMenuOpen.value = false;
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

</script>


<style scoped>
.top-bar {
  width: 100%;
  border-bottom: 0.5px solid #cbd5e1;
  background-color: transparent;
}

.top-bar-inner {
  margin: 0 auto;
  padding: 16.5px 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.home-router-btn {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.ch-logo {
  display: none;
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
}

.ch-logo:hover {
  opacity: 0.7;
}

.site-title {
  font-size: 23px;
  margin: 0;
  white-space: nowrap;
}

.site-title:hover {
  color: #cbd5e1;
}

.dark .nav-links a {
  color: #60A5FA;
}

.dark .toggle-btn {
  /* color: #cbd5e1; */
  color: #60A5FA;
}

.dark .top-bar {
  width: 100%;
  border-bottom: 0.5px solid #cbd5e1;
  background-color: transparent;
}

.dark .site-title {
  color: #60A5FA;
}

.dark .site-title:hover {
  color: purple;
}

.dark .hamburger-icon {
  color: #cbd5e1;
}

.dark .mobile-menu {
  background-color: #eef5fd;
  color: red;
}

.dark .mobile-menu a {
  color: #60A5FA;
}

.nav-links a,
.mobile-menu a {
  color: #cbd5e1;
  text-decoration: none;
  margin-left: 20px;
  font-weight: bold;
  font-size: 18.5px;
}

.nav-links a:hover,
.mobile-menu a:hover {
  text-decoration: underline;
}

/* these are related to the toggle dark mode button */
.nav-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  min-width: 350px;
}

.nav-items {
  display: flex;
  align-items: center;
}

.nav-items a {
  margin-left: 20px;
}

.toggle-btn {
  margin-left: auto;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.toggle-btn:hover {
  filter: brightness(70%);
}
/* these are related to the toggle dark mode button */

.mobile-menu {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #1f2937;
}

.mobile-menu a {
  margin: 10px 0;
}

.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

.hamburger-icon {
  font-size: 24px;
  cursor: pointer;
}


@media (max-width: 750px) {
  .top-bar-inner {
    padding: 17px 17px;
  }

  .mobile-only {
    display: flex;
  }

  .desktop-only {
    display: none;
  }
}

@media (max-width: 600px) {
  .ch-logo {
    display: block;
  }

  .site-title {
    display: none;
  }

  .top-bar-inner {
    padding: 11px 25px;
  }
}

</style>
