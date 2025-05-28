<template>
  <div class="container">
    <h1>Login with Patreon</h1>
    <button @click="loginWithPatreon">Sign in with Patreon</button>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '../../lib/axios.js';

const user = ref(null);
const route = useRoute();

// Check for OAuth error from Patreon
const error = route.query.error;

const fetchUserData = async () => {
  try {
    const { data } = await axiosInstance.get('/lessons/me', {
      withCredentials: true
    });

    user.value = data;
  } catch (err) {
    console.warn('Not authenticated or error fetching user data', err);
  }
};

const loginWithPatreon = () => {
  window.location.href = `${import.meta.env.VITE_API_LINK}/lessons/login`;
};

onMounted(() => {
  fetchUserData();
  window.scrollTo(0, 0);
});

</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  font-family: Arial, sans-serif;
}

button {
  padding: 10px 20px;
  background-color: #f96854;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
}

h3 {
  margin-top: 20px;
}

</style>
