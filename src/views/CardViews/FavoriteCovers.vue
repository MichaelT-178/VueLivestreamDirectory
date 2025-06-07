<template>
  <div>
    <HeaderWithIcon
      title="My Favorite Covers"
      icon="heart"
      iconColor="#F472B6"
    />

    <div class="grid">
      <div
        v-for="cover in AllData.FavoriteCovers"
        :key="cover.id"
        class="square"
      >
        <a :href="cover.Link" target="_blank" rel="noopener noreferrer">
          <img
            :src="getImagePath(cover)"
            class="album-img"
            :alt="cover.Song"
          />
        </a>
        <p class="song">{{ cover.Song }} by {{ cover.Artist }}</p>
        <p class="appearance">{{ cover.Appearance }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import AllData from "../../assets/Data/FavCovers.json";
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';

onMounted(() => {
  window.scrollTo(0, 0);
});

const getImagePath = (song) => {

  if (!song.ArtistPic) {
    return new URL(`../../assets/AlbumPics/${song.AlbumImage}.jpg`, import.meta.url).href;
  }

  return new URL(`../../assets/ArtistPics/${song.AlbumImage}.jpg`, import.meta.url).href;

};

</script>


<style scoped>
.title {
  color: white;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  padding: 20px;
}

.square {
  background-color: #F472B6;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  color: white;
}

.album-img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
}

.song {
  font-size: 14px;
  font-weight: bold;
}

.appearance {
  font-size: 12px;
  color: #aaa;
}
</style>
