<template>
  <div class="container">
    <div class="login-card">
      <h1>Login to View Lessons</h1>
      <p class="note">
        * Note: All this program does is check whether you're a member of Corey's Patreon at the 'Student' tier.
      </p>
      <button 
        class="patreon-btn"
        @click="loginWithPatreon"
      >
        Login with Patreon
      </button>
      <!-- <a 
        class="secondary-btn"
        href="https://www.patreon.com/coreyheuvel"
        target="_blank" 
        rel="noopener noreferrer"
      >
        Corey's Patreon
      </a> -->
      
      <!-- I am NOT collecting your data or doing anything else. -->

      <router-link 
        class="secondary-btn"
        to="/"
      >
        Go back to Home
      </router-link>

      <p v-if="error" class="error-message">Error: {{ error }}</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '../../lib/axios.js';

const user = ref(null);
const route = useRoute();
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
body {
  background-color: #0F172A;
  margin: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 1rem;
  background-color: #0F172A;
}

.login-card {
  background-color: #1E293B;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #F8FAFC;
  max-width: 400px;
  width: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 1.75rem;
  margin-bottom: 0rem;
}

.note {
  font-size: 16px;
  color: #CBD5E1;
  margin-bottom: 2rem;
}

.patreon-btn {
  padding: 12px 24px;
  background-color: #f96854;
  color: white;
  border: none;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  display: inline-block;
  margin-bottom: 12px;
}

.patreon-btn:hover {
  background-color: #ff7a67;
}

.secondary-btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #64748b;
  color: white;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.secondary-btn:hover {
  background-color: #94a3b8;
}

.error-message {
  margin-top: 1rem;
  color: #f87171;
  font-size: 0.9rem;
}

@media (max-width: 400px) {
  .login-card {
    padding: 1rem 1.5rem;
  }

  h1 {
    margin-bottom: 0.25rem;
  }
  
}

@media (max-width: 425px) {
  .login-card {
    padding: 1rem 0.25rem;
  }

  h1 {
    margin-bottom: 0rem;
    font-size: 24px;
  }
  
}

</style>
