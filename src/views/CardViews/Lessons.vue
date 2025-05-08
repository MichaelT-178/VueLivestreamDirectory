<template>
  <div>
    <p class="title">Second Page</p>
    <router-link to="/" class="router-button">
      Go to Home page
    </router-link>

    <div>
      <p class="status" v-if="message">{{ message }}</p>
      <p class="status error" v-else>You don't have access to this content.</p>
    </div>

  </div>
</template>


<script setup>
import { useUser } from '../../composables/useUser';
import { ref, watch } from 'vue';

const { user } = useUser();
const message = ref('');

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
