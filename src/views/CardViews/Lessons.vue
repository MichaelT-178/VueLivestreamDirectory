<template>
  <div>
    <HeaderWithIcon
      title="Patreon Lessons"
      icon="school"
      iconColor="#C084FC"
    />

    <div v-if="message && message.Tutorials">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search by title, artist, or tuning..." 
        class="search-bar"
      />

      <div 
        v-for="tutorial in filteredTutorials" 
        :key="tutorial.id" 
        class="lesson-card"
      >
        <img 
          :src="`/thumbnails/${tutorial.thumbnail}`" 
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

    <p class="status error" v-else>You don't have access to this content.</p>
  </div>
</template>


<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../../lib/axios';
import { useUser } from '../../composables/useUser';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';

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

.status.error {
  color: red;
}

.search-bar {
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
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

</style>
