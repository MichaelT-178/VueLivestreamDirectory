<template>
  <div class="page-container" v-if="album">
    <div class="header-wrapper">
      <HeaderWithIcon
        title="Album"
        icon="DiscThree"
        iconColor="emerald"
        :leadingIcon="headerConfig.leadingIcon"
        :leadingIconColor="headerConfig.leadingIconColor"
        :leadingIconRoute="headerConfig.leadingIconRoute"
      />
    </div>

    <div class="content-wrapper">
      <div class="image-wrapper">
        <img 
          :src="getAlbumImagePath(album.CleanedAlbumTitle)" 
          :alt="album.AlbumTitle" 
          class="album-image"
        />
      </div>

      <div class="album-details">
        <h2>{{ album.AlbumTitle }}</h2>

        <div class="artist-info" v-if="album.Artist && album.CleanedArtist">
          <img 
            :src="getArtistImagePath(album.CleanedArtist)" 
            :alt="album.Artist" 
            class="artist-thumb"
          />
          <router-link
            :to="{
              name: 'ArtistPageFromAlbum',
              params: {
                album: album.CleanedAlbumTitle,
                artist: album.CleanedArtist
              }
            }"
            class="artist-link"
          >
            {{ album.Artist }}
          </router-link>
        </div>

        <p v-if="album.Year" class="year-text">
          Album <span class="album-circle">•</span> {{ album.Year }}
        </p>
      </div>
    </div>

    <div v-if="album.Songs?.length" class="songs-section">
      <div class="tab-header">
        <strong class="tab-label no-border">Songs</strong>
      </div>

      <ul class="song-list">
        <li 
          v-for="(song, index) in album.Songs" 
          :key="index" 
          :class="{ zebra: index % 2 === 1 }"
        >
          <router-link
            :to="{
              name: 'SongPageFromAlbum',
              params: {
                album: props.album,
                song: song.CleanedSong
              }
            }"
            class="song-link"
          >
            <div class="song-entry-row">
              <div class="song-entry-index" :class="{ 'non-zebra-text': index % 2 === 0 }">
                {{ index + 1 }}
              </div>
              <div class="song-entry-content" :class="{ 'non-zebra-text': index % 2 === 0 }">
                <div class="song-title">
                  {{ song.Song }}
                </div>
                <div class="song-artist">
                  {{ album.Artist }}
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>

  <div class="page-container" v-else>
    <p>Album not found.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import AlbumData from '../assets/Data/albums.json'
import HeaderWithIcon from '../components/HeaderWithIcon.vue'
import { useScreenHelpers } from '../composables/useScreenHelpers.js';

const props = defineProps({
  album: String,
  artist: {
    type: String,
    required: false
  },
  song: {
    type: String,
    required: false
  }
})

const { isSmallScreen, scrollToTop } = useScreenHelpers();

const album = computed(() => AlbumData[props.album])

const headerConfig = computed(() => {
  if (props.artist) {
    return {
      leadingIcon: 'palette',
      leadingIconColor: 'indigo',
      leadingIconRoute: `/artist/${props.artist}`
    }
  } else if (props.song) {
    return {
      leadingIcon: 'audiolines',
      leadingIconColor: 'orange',
      leadingIconRoute: `/song/${props.song}`
    }
  }

  return {
    leadingIcon: 'home',
    leadingIconColor: 'sky',
    leadingIconRoute: '/'
  }
})

const getAlbumImagePath = (cleanedTitle) => {
  return new URL(`../assets/AlbumPics/${cleanedTitle}.jpg`, import.meta.url).href
}

const getArtistImagePath = (cleanedName) => {
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-wrapper {
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 800px;
  width: 100%;
}

.image-wrapper {
  flex-shrink: 0;
}

.album-image {
  width: 250px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.album-details {
  flex: 1;
  min-width: 250px;
}

.album-details h2 {
  color: white;
  margin-bottom: 0.5rem;
}

.artist-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.artist-thumb {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.artist-link {
  color: #007acc;
  text-decoration: none;
}

.artist-link:hover {
  color: #63beff;
  text-decoration: underline;
}

.year-text {
  margin-top: 7px;
  color: #e3e3e3;
}

.album-circle {
  font-size: 15px;
}

.songs-section {
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
}

.tab-header {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #333;
}

.tab-label {
  color: white;
  padding-bottom: 10px;
  position: relative;
}

.tab-label.no-border {
  border-bottom: none;
}

.song-list {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
}

.song-list li {
  padding: 0;
  background-color: #131e37;
  overflow: hidden;
  transition: color 0.3s ease;
}

.song-list li.zebra {
  background-color: #0F172A;
}

.song-link {
  display: block;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.song-link:hover .song-entry-row {
  background-color: #090e19;
  text-decoration: underline;
}

.song-entry-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  transition: color 0.3s ease;
}

.song-entry-index {
  min-width: 40px;
  font-weight: bold;
  color: white;
}

.song-entry-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  color: white;
}

.song-title {
  font-weight: bold;
  font-size: 1.05rem;
  color: #e3e3e3;
}

.song-artist {
  font-size: 0.95rem;
  margin-top: 0.25rem;
  color: #e3e3e3;
}

@media (max-width: 595px) {
  .album-details {
    margin-top: -40px;
  }
}

@media (max-width: 400px) {
  .page-container {
    padding: 2rem 1rem;
  }

  .image-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: -40px;
  }
  
  .song-entry-index {
    min-width: 20px;
  }
  
  .songs-section {
    margin-top: 15px;
  }
}

</style>
