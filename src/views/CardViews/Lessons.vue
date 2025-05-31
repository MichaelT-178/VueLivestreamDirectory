<template>
  <div>
    <HeaderWithIcon
      title="Patreon Lessons"
      icon="school"
      iconColor="#C084FC"
    />

    <div>
      <p class="status" v-if="message">{{ message }}</p>
      <p class="status error" v-else>You don't have access to this content.</p>
    </div>
  </div>
</template>


<script setup>
import { useUser } from '../../composables/useUser';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../../lib/axios';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';

const { user } = useUser();
const message = ref('');

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
    message.value = newUser.message;
  }
});

</script>


<style scoped>
.title {
  color: purple;
  font-family: Arial, sans-serif;
}

.status {
  margin: 1rem 0;
  font-weight: bold;
  color: green;
}

.router-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f96854;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.router-button:hover {
  background-color: #e45745;
}

.status.error {
  color: red;
}

</style>
