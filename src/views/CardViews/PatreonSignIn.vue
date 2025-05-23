<template>
  <div class="container">
    <h1>Login with Patreon</h1>
    <button @click="loginWithPatreon">Sign in with Patreon</button>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const user = ref(null);
const API_LINK = import.meta.env.VITE_API_LINK;

const route = useRoute();

// patreon-sign-in?error=access_denied
// This will be undefined if not present
const error = route.query.error;

async function fetchUserData() {
  try {
    const response = await fetch(`${API_LINK}/me`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Not logged in');
    }

    user.value = await response.json();
  } catch (err) {
    console.warn('Not authenticated or error fetching data', err);
  }
}

const loginWithPatreon = () => {
  window.location.href = `${API_LINK}/login`;
};

onMounted(fetchUserData);

onMounted(() => {
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
