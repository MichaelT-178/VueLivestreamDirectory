<template>
  <div class="search-bar-container">
    <font-awesome-icon icon="search" class="search-icon" />
    <input 
      class="search-bar"
      type="text" 
      placeholder="Search by song, artist, or instrument"
    />
  </div>
</template>


<script setup>
</script>


<style scoped>
.search-bar-container {
  position: relative;
  width: 70%;
  max-width: 700px;
  margin: 0 auto;
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
