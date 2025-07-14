<template>
  <LoadingSpinner v-if="!hasLoaded" :loading="true" />

  <template v-else>

    <div v-if="message && message.Tutorials">
      <div class="lessons-container">
        <HeaderWithIcon
          title="Patreon Lessons"
          icon="school"
          iconColor="purple"
        />

        <div class="search-bar-container">
          <font-awesome-icon icon="search" class="search-icon" />
          <input 
            id="tutorial-search"
            name="tutorial-search"
            v-model="searchQuery" 
            type="text" 
            autocomplete="off"
            placeholder="Filter by song, artist, or tuning"
            class="search-bar"
          />
        </div>

        <p v-if="filteredTutorials.length === 0" class="no-results-msg">
          No results found
        </p>

        <div class="lesson-grid">
          <LessonCard 
            v-for="tutorial in filteredTutorials" 
            :key="tutorial.id" 
            :lesson="tutorial"
          />
        </div>

        <button
          v-if="isSmallScreen && !searchQuery"
          class="go-to-top-btn"
          @click="scrollToTop"
        >
          Go back to top
        </button>
      </div>
    </div>

    <!-- Show error if unauthorized -->
    <div v-else>
      <div class="unauthorized-container">
        <div class="unauthorized-content">
          <HeaderWithIcon
            title="Patreon Lessons"
            icon="school"
            iconColor="purple"
          />

          <ErrorCard 
            title="401 - Unauthorized" 
            description="You don't have access to view this content. Go sign up for Corey's Patreon at the 'Student' tier!"
            link="https://www.patreon.com/coreyheuvel"
            linkTitle="Go to Corey's Patreon"
          />

          <router-link to="/" class="mobile-home-button">
            Go back home
          </router-link>
        </div>
      </div>
    </div>
  </template>
</template>


<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../../lib/axios';
import { useUser } from '../../composables/useUser';
import { useScreenHelpers } from '../../composables/useScreenHelpers.js';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import LessonCard from '../../components/LessonCard.vue';
import ErrorCard from '../../components/ErrorCard.vue';
import LoadingSpinner from '../../components/LoadingSpinner.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { user, fetchUserData } = useUser();
const message = ref(null);
const searchQuery = ref('');
const hasLoaded = ref(false);
const router = useRouter();
const { isSmallScreen, scrollToTop } = useScreenHelpers();

watch(user, (newUser) => {
  if (newUser?.message) {
    try {
      message.value = typeof newUser.message === 'string'
        ? JSON.parse(newUser.message)
        : newUser.message;
    } catch {
      message.value = null;
    }
  } else {
    message.value = null;
  }
});

const filteredTutorials = computed(() => {
  if (!message.value?.Tutorials) return [];

  const query = searchQuery.value.toLowerCase();

  return message.value.Tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(query) ||
    tutorial.artist.toLowerCase().includes(query) ||
    tutorial.tuning.toLowerCase().includes(query) ||
    (tutorial.search?.toLowerCase().includes(query) ?? false)
  );
});

const logoutAndGoBack = async () => {
  try {
    await axiosInstance.post('/lessons/logout', null, {
      withCredentials: true
    });
  } catch (err) {
    console.error('Logout failed', err);
  } finally {
    router.push('/');
  }
};

const handleUnload = () => {
  navigator.sendBeacon('/lessons/logout');
};

onMounted(() => {
  window.addEventListener('beforeunload', handleUnload);
});

onMounted(async () => {
  await fetchUserData();
  hasLoaded.value = true; 
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleUnload);
  logoutAndGoBack();
});

</script>


<style scoped>
.lessons-container {
  padding: 1rem 2rem;
}

.search-bar-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 1rem 0;
}

.search-bar {
  width: 100%;
  padding: 9px 10px 9px 37px;
  border-radius: 6px;
  background-color: #eeeded;
  border: 2px solid #eeeded;
  font-size: 16px;
  color: #111;
  box-sizing: border-box;
}

.search-bar::placeholder {
  color: #555;
}

.search-bar:focus {
  outline: none;
  box-shadow: none;
  border-color: #2275d9;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #555;
}

.lesson-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.unauthorized-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.unauthorized-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 400px;
}

.unauthorized-container :deep(.error-card) {
  margin-top: 20px;
}

.mobile-home-button {
  display: none;
  background-color: #007eb4;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 20px;
  margin-top: -30px;
  align-self: center;
}

.no-results-msg {
  color: #888;
  margin-top: -5px;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

@media (max-width: 900px) {
  .search-bar-container {
    width: 100%;
  }
}

@media (max-width: 500px) {
  .search-bar {
    font-size: 14px;
    padding: 8px 8px 8px 36px;
  }

  .search-icon {
    font-size: 14px;
  }

  .mobile-home-button {
    display: block;
  }
}

@media (max-width: 400px) {
  .go-to-top-btn {
    display: block;
    margin: 40px auto 50px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #c084fc;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .go-to-top-btn:hover {
    background-color: #a855f7;
  }
}

</style>
