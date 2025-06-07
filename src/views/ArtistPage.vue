<template>
  <div class="page-container" v-if="artist">
    <h1>{{ artist.Artist }}</h1>

    <img 
      :src="getImagePath(artist.CleanedArtist)" 
      :alt="artist.Artist" 
      class="artist-image"
    />

    <div class="songs" v-if="artist.Songs && artist.Songs.length">
      <h2>Songs</h2>
      <ul>
        <li v-for="song in artist.Songs" :key="song.Id">
          <p><strong>Title:</strong> {{ song.Title }}</p>
          <p v-if="song.Album"><strong>Album:</strong> {{ song.Album }}</p>
        </li>
      </ul>
    </div>

    <div class="albums" v-if="artist.Albums && artist.Albums.length">
      <h2>Albums</h2>
      <ul>
        <li v-for="album in artist.Albums" :key="album.CleanedTitle">
          <p><strong>Title:</strong> {{ album.Title }}</p>
          <p><strong>Year:</strong> {{ album.Year }}</p>
        </li>
      </ul>
    </div>
  </div>

  <div class="page-container" v-else>
    <p>Artist not found.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import ArtistData from '../assets/Data/artists.json'

const props = defineProps({
  name: String
})

const artist = computed(() => ArtistData[props.name])

const getImagePath = (cleanedName) => {
  return new URL(`../assets/ArtistPics/${cleanedName}.jpg`, import.meta.url).href
}

onMounted(() => {
  window.scrollTo(0, 0)
})

</script>

<style scoped>
.page-container {
  padding: 2rem;
  font-size: 1.1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.artist-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
}

.songs, .albums {
  margin-top: 2rem;
}

h1, h2 {
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-left: 4px solid #ccc;
  background-color: #f9f9f9;
}
</style>
