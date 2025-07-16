<template>
  <nav-bar />
  <router-view />
</template>


<script setup>
import NavBar from "../src/components/NavBar.vue";
</script>


<style>
html, body {
  margin: 0;
  padding: 0;
  background: #0F172A;
}

html.dark, html.dark body {
  background: #f5f5f5;
  color: #f5f5f5;
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
