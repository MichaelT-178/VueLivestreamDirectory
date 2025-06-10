<template>
  <div class="page-container" v-if="artist">
    <HeaderWithIcon
      :title="artist.Artist"
      icon="palette"
      iconColor="#FB923C"
    />

    <h1>{{ artist.Artist }}</h1>

    <img 
      :src="getArtistImagePath(artist.CleanedArtist)" 
      :alt="artist.Artist" 
      class="artist-image"
    />

    <div class="songs" v-if="artist.Songs && artist.Songs.length">
      <h2>Songs</h2>
      <ul>
        <li 
          v-for="song in artist.Songs" 
          :key="song.Id" 
          class="song-item"
        >
          <router-link 
            :to="{ name: 'SongPageWithArtist', params: { title: song.CleanedTitle, artist: artist.CleanedArtist } }" 
            class="song-link"
          >
            <img
              :src="getSongImagePath(song)"
              :alt="song.Title"
              class="song-image"
            />
            <div class="song-info">
              <p><strong>Title:</strong> {{ song.Title }}</p>
              <p v-if="song.Album"><strong>Album:</strong> {{ song.Album }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="albums" v-if="artist.Albums && artist.Albums.length">
      <h2>Albums</h2>
      <ul>
        <li 
          v-for="album in artist.Albums" 
          :key="album.CleanedTitle" 
          class="album-item"
        >
          <router-link 
            :to="{ name: 'AlbumPageWithArtist', params: { name: album.CleanedTitle, artist: artist.CleanedArtist } }" 
            class="album-link"
          >
            <img 
              :src="getAlbumImagePath(album.CleanedTitle)" 
              :alt="album.Title" 
              class="album-image"
            />
            <div class="album-info">
              <p><strong>Title:</strong> {{ album.Title }}</p>
              <p><strong>Year:</strong> {{ album.Year }}</p>
            </div>
          </router-link>
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
import HeaderWithIcon from '../components/HeaderWithIcon.vue'

const props = defineProps({
  name: String
})

const artist = computed(() => ArtistData[props.name])

const getArtistImagePath = (cleanedName) => {
  return new URL(`../assets/ArtistPics/${cleanedName}.jpg`, import.meta.url).href
}

const getAlbumImagePath = (cleanedTitle) => {
  return new URL(`../assets/AlbumPics/${cleanedTitle}.jpg`, import.meta.url).href
}

const getSongImagePath = (song) => {
  if (song.CleanedAlbum) {
    return new URL(`../assets/AlbumPics/${song.CleanedAlbum}.jpg`, import.meta.url).href
  }
  return new URL(`../assets/ArtistPics/${artist.value.CleanedArtist}.jpg`, import.meta.url).href
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

.album-item, .song-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.album-link, .song-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.album-image, .song-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.album-info, .song-info {
  flex: 1;
}
</style>
