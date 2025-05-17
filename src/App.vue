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
  background: #0F172A;
  /* background-color: #0d1117; */
  /* background-color: red; */
}

.app-container {
  min-height: 100vh;
  background-attachment: fixed;

    /* background: linear-gradient(to bottom, #0d1117, #16202f, #0f1c2e); */
  /* background: linear-gradient(
    to bottom, 
    #0d1117 0%,    
    #16202f 25%,   
    #1a2a40 50%,   
    #112233 75%,   
    #0b0f1a 100%   
  ); */
}

</style>
