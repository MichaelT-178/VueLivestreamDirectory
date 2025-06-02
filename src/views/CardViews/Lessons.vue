<template>
  <div>
    <HeaderWithIcon
      title="Patreon Lessons"
      icon="school"
      iconColor="#C084FC"
    />

    <div v-if="message && message.Tutorials">
      <div class="search-bar-container">
        <font-awesome-icon icon="search" class="search-icon" />
        <input 
          id="tutorial-search"
          name="tutorial-search"
          v-model="searchQuery" 
          type="text" 
          placeholder="Filter by song, artist, or tuning"
          class="search-bar"
        />
      </div>

      <div 
        v-for="tutorial in filteredTutorials" 
        :key="tutorial.id" 
        class="lesson-card"
      >
        <img 
          :src="getImageUrl(tutorial.thumbnail)"
          :alt="tutorial.title" 
          class="thumbnail"
        />
        <div class="lesson-info">
          <h3>{{ tutorial.title }}</h3>
          <p><strong>Artist:</strong> {{ tutorial.artist }}</p>
          <p><strong>Tuning:</strong> {{ tutorial.tuning }}</p>
          <p><strong>Date:</strong> {{ tutorial.date }}</p>
          <a :href="tutorial.link" target="_blank" rel="noopener">Watch</a>
        </div>
      </div>
    </div>

    <p v-else>
      <ErrorCard 
        title="401 - Unauthorized" 
        description="You don't have access to view this content. Go sign up for Corey's Patreon at the 'Student' tier!"
        link="https://www.patreon.com/coreyheuvel"
        linkTitle="Go to Corey's Patreon"
      />
    </p>

  </div>
</template>


<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../../lib/axios';
import { useUser } from '../../composables/useUser';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ErrorCard from '../../components/ErrorCard.vue';

const { user } = useUser();
const message = ref(null);
const searchQuery = ref('');
const router = useRouter();

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

watch(user, (newUser) => {
  if (newUser && newUser.message) {
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
  if (!message.value || !message.value.Tutorials) return [];

  const query = searchQuery.value.toLowerCase();

  return message.value.Tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(query) ||
    tutorial.artist.toLowerCase().includes(query) ||
    tutorial.tuning.toLowerCase().includes(query) ||
    (tutorial.search?.toLowerCase().includes(query) ?? false)
  );
});

const getImageUrl = (filename) => {
  return new URL(`../../assets/lesson-thumbnails/${filename}`, import.meta.url).href;
};

const handleUnload = () => {
  navigator.sendBeacon('/lessons/logout');
};

onMounted(() => {
  window.addEventListener('beforeunload', handleUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleUnload);
  logoutAndGoBack();
});

</script>


<style scoped>
.status {
  margin: 1rem 0;
  font-weight: bold;
  color: green;
}

.search-bar-container {
  position: relative;
  width: 70%;
  max-width: 700px;
  margin: 1rem auto;
}

.search-bar {
  width: 100%;
  padding: 14px 14px 14px 60px;
  border-radius: 50px;
  border: 2px solid #444;
  font-size: 20px;
  box-sizing: border-box;
}

.search-bar::placeholder {
  color: #707070;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 22px;
  color: #707070;
}

.lesson-card {
  display: flex;
  align-items: flex-start;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9f9f9;
  gap: 1rem;
}

.thumbnail {
  width: 120px;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
}

.lesson-info h3 {
  margin: 0 0 0.5rem;
}

.lesson-info p {
  margin: 0.2rem 0;
}

.lesson-info a {
  color: #007BFF;
  text-decoration: underline;
}

/* Responsive styling */
@media (max-width: 900px) {
  .search-bar-container {
    width: 80%;
  }
}

@media (max-width: 600px) {
  .search-bar-container {
    width: 90%;
  }
}

@media (max-width: 500px) {
  .search-bar {
    font-size: 18px;
  }

  .search-icon {
    font-size: 20px;
  }
}

@media (max-width: 400px) {
  .search-bar-container {
    width: 96%;
  }

  .search-bar {
    border-radius: 8px;
    padding: 13px 14px 13px 15px;
  }

  .search-icon {
    display: none;
  }
}
</style>
