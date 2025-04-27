<template>
  <div class="app-container">
    <router-view />
  </div>
</template>


<script setup>
</script>


<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #0d1117;
}

.app-container {
  min-height: 100vh;
  /* background: linear-gradient(to bottom, #0d1117, #16202f, #0f1c2e); */
  background: linear-gradient(
    to bottom, 
    #0d1117 0%, 
    #1a2a40 30%, 
    #112233 60%, 
    #0b0f1a 100%
  );
  background-attachment: fixed;
}

</style>
